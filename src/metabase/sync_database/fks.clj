(ns metabase.sync-database.fks
  "Logic for syncing the Foreign Keys in a given Table."
  (:require [clojure.tools.logging :as log]
            [schema.core :as s]
            [toucan.db :as db]
            [metabase.driver :as driver]
            (metabase.models database
                             [field :refer [Field]]
                             [table :refer [Table]])
            [metabase.sync-database.interface :as i]
            [metabase.util :as u]
            [metabase.util.schema :as su])
  (:import clojure.lang.Keyword
           metabase.models.database.DatabaseInstance
           metabase.models.table.TableInstance))

(defn- ^String named-table
  "Return a schema-qualified name for TABLE."
  ([table]                   (named-table (:schema table) (:name table)))
  ([table-schema table-name] (str (when table-schema (str table-schema ".")) table-name)))

(def ^:private FKTable
  {:database_id su/IntGreaterThanZero
   :id          su/IntGreaterThanZero
   :schema      (s/maybe su/NonBlankString)
   :name        su/NonBlankString})

(s/defn ^:private ^:always-validate fk-name
  [table :- FKTable, field-name :- su/NonBlankString] :- su/NonBlankString
  (str (named-table table) \. field-name))

(def ^:private ResolvedFKDefinition
  {:fk-name        su/NonBlankString       ; should be a fully-qualified name like "schema.table.field". Used for logging purposes
   :fk-field-id   su/IntGreaterThanZero
   :dest-name      su/NonBlankString
   :dest-field-id su/IntGreaterThanZero})

(s/defn ^:private ^:always-validate resolve-fk-definitions
  "Take a sequence of FKDefinitions for DATABASE-ID and TABLE-ID and look up the objects that they're referring to,
   returning a new sequence of ResolvedFKDefinitions."
  [table :- FKTable, fks :- i/DescribeTableFKs] :- [ResolvedFKDefinition]
  (filter identity (for [{:keys [fk-field-name dest-field-name dest-table], :as fk} fks]
                     (when-let [fk-field-id (db/select-one-id Field, :table_id (:id table), :name fk-field-name)]
                       (when-let [dest-table-id (db/select-one-id Table, :db_id (:database_id table), :schema (:schema dest-table), :name (:name dest-table))]
                         (when-let [dest-field-id (db/select-one-id Field, :table_id dest-table-id, :name dest-field-name)]
                           {:fk-name       (fk-name table fk-field-name)
                            :fk-field-id   fk-field-id
                            :dest-name     (fk-name dest-table dest-field-name)
                            :dest-field-id dest-field-id}))))))

(s/defn ^:private ^:always-validate remove-old-fks!
  "Clear the `fk_target_field_id` value for Fields belonging to TABLE-ID that are no longer FKs.
   (RESOLVED-FKs is a sequence of maps defining the current FK relationships in this Table.)"
  [table-id :- su/IntGreaterThanZero, resolved-fks :- [ResolvedFKDefinition]]
  (doseq [field (db/select [Field :id :name]
                  :table_id table-id
                  :id       [:not-in (set (map :fk-field-id resolved-fks))])]
    ;; TODO - Make this logging a little better and include Field name
    (log/debug (u/format-color 'red "Field '%s' is no longer a foreign key." (:name field)))
    (db/update! Field (u/get-id field)
      :fk_target_field_id nil)))

(s/defn ^:private ^:always-validate update-fks!
  [table-id :- su/IntGreaterThanZero, resolved-fks :- [ResolvedFKDefinition]]
  (doseq [{:keys [fk-name fk-field-id dest-name dest-field-id]} resolved-fks]
    (log/debug (u/format-color 'cyan "Marking foreign key '%s' -> '%s'." fk-name dest-name))
    (db/update! Field fk-field-id
      :fk_target_field_id dest-field-id)))

(s/defn ^:private ^:always-validate save-all-table-fks!
  "Save *all* foreign-key data for a given RAW-TABLE.
   NOTE: this function assumes that FKS is the complete set of fks in the RAW-TABLE."
  [{table-id :id, database-id :database_id, :as table}, fks :- i/DescribeTableFKs]
  {:pre [(integer? table-id) (integer? database-id)]}
  (let [resolved-fks (resolve-fk-definitions database-id table-id fks)]
    (db/transaction
      ;; delete any FK values that are no longer relevant
      (remove-old-fks! table-id resolved-fks)
      ;; now lookup column-ids and set the fks on this table as needed
      (update-fks! table-id resolved-fks))))

(s/defn ^:always-validate sync-fks!
  "Handle any FK syncing. This takes place after tables/fields are in place because we need the ids of the tables/fields to do FK references."
  [database :- DatabaseInstance]
  (let [driver (driver/database->driver database)
        tables (db/select Table :db_id (u/get-id database))]
    (when (driver/driver-supports? driver :foreign-keys)
      (doseq [{table-schema :schema, table-name :name, :as table} tables]
        (try
          (when-let [table-fks (u/prog1 (driver/describe-table-fks driver database table)
                                 (s/validate i/DescribeTableFKs <>))]
            (when-let [table (Table :db_id (u/get-id database), :schema table-schema, :name table-name)]
              (save-all-table-fks! table table-fks)))
          (catch Throwable t
            (log/error (u/format-color 'red "Unexpected error introspecting table fks: %s" (named-table table-schema table-name)) t)))))))
