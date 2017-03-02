(ns metabase.sync-database.metabase-metadata
  "Logic for syncing the `_metabase_metadata` table, if it exists. The `_metabase_metadata`
   table is a special table that can include Metabase metadata about the rest of the DB.
   This is used by the sample dataset."
  (:require [clojure.tools.logging :as log]
            [clojure.string :as str]
            [schema.core :as s]
            [toucan.db :as db]
            [metabase.driver :as driver]
            (metabase.models [field :refer [Field]]
                             [table :refer [Table]])
            [metabase.util :as u]
            [metabase.util.schema :as su])
  (:import metabase.models.database.DatabaseInstance))

(defn- is-metabase-metadata-table?
  "Is this TABLE the special `_metabase_metadata` table?"
  [table]
  (= "_metabase_metadata" (str/lower-case (:name table))))

(defn- metabase-metadata-table-info [database]
  ;; TODO - fetch the info for metabase-metadata table if it exists
)

(s/defn ^:always-validate sync-metabase-metadata-table!
  "Databases may include a table named `_metabase_metadata` (case-insentive) which includes descriptions or other metadata about the `Tables` and `Fields`
   it contains. This table is *not* synced normally, i.e. a Metabase `Table` is not created for it. Instead, *this* function is called, which reads the data it
   contains and updates the relevant Metabase objects.

   The table should have the following schema:

     column  | type    | example
     --------+---------+-------------------------------------------------
     keypath | varchar | \"products.created_at.description\"
     value   | varchar | \"The date the product was added to our catalog.\"

   `keypath` is of the form `table-name.key` or `table-name.field-name.key`, where `key` is the name of some property of `Table` or `Field`.

   This functionality is currently only used by the Sample Dataset. In order to use this functionality, drivers must implement optional fn `:table-rows-seq`."
  [database :- DatabaseInstance]
  (when-let [table-info (metabase-metadata-table-info database)]
    (doseq [{:keys [keypath value]} (driver/table-rows-seq (driver/database->driver database) database table-info)]
      ;; TODO: this does not support schemas in dbs :(
      (let [[_ table-name field-name k] (re-matches #"^([^.]+)\.(?:([^.]+)\.)?([^.]+)$" keypath)]
        ;; ignore legacy entries that try to set field_type since it's no longer part of Field
        (when-not (= (keyword k) :field_type)
          (try (when-not (if field-name
                           (when-let [table-id (db/select-one-id Table
                                                 ;; TODO: this needs to support schemas
                                                 ;; TODO: eventually limit this to "core" schema tables
                                                 :db_id  (:id database)
                                                 :name   table-name
                                                 :active true)]
                             (db/update-where! Field {:name     field-name
                                                      :table_id table-id}
                               (keyword k) value))
                           (db/update-where! Table {:name  table-name
                                                    :db_id (:id database)}
                             (keyword k) value))
                 (log/error (u/format-color 'red "Error syncing _metabase_metadata: no matching keypath: %s" keypath)))
               (catch Throwable e
                 (log/error (u/format-color 'red "Error in _metabase_metadata: %s" (.getMessage e))))))))))
