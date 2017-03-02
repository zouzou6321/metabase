(ns metabase.sync-database.tables
  "Logic for syncing the Tables belonging to a Database.
   This does two things:

   1.  Mark Tables that are no longer present in the DB as inactive
   2.  Insert new Tables to represent new physical tables in the DB as needed"
  (:require [clojure.data :as data]
            [schema.core :as s]
            [toucan.db :as db]
            [metabase.driver :as driver]
            [metabase.models.table :refer [Table]]
            [metabase.sync-database.interface :as i]
            [metabase.util :as u]))

(defn- describe-tables [database]
  (-> (:tables (u/prog1 (driver/describe-database (driver/database->driver database) database)
                 (s/validate i/DescribeDatabase <>)))
      (conj {:name "x", :schema "y"})
      (disj {:name "categories", :schema "public"})))

(defn- tables-diff
  "Diff the physical and metabase sets of tables that exist for this database.
   Returns a vector like `[new-physical-tables inactive-metabase-tables]`"
  [database]
  (let [physical-tables (describe-tables database)
        metabase-tables (set (map (partial into {}) (db/select [Table :name :schema] :db_id (u/get-id database))))]
    (data/diff physical-tables metabase-tables)))

(defn- make-tables-inactive! [database-id inactive-metabase-tables]
  ;; TODO
  )

(defn- create-new-tables! [database-id new-physical-tables]
  ;; TODO
  )

(defn sync-tables! [database]
  (let [[new-physical-tables inactive-metabase-tables] (tables-diff database)]
    (make-tables-inactive! (u/get-id database) inactive-metabase-tables)
    (create-new-tables! (u/get-id database) new-physical-tables)))

(def db (db/select-one 'Database :engine "postgres"))
