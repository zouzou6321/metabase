(ns metabase.sync-database.sync
  "Top-level entry-point for the sync process.
   The sync process fetches information about a database's schema and creates/updates the
   corresponding Metabase representations (Tables and Fields)."
  (:require [clojure.tools.logging :as log]
            [schema.core :as s]
            [toucan.db :as db]
            [metabase.driver :as driver]
            metabase.models.database
            [metabase.query-processor.interface :as qpi]
            (metabase.sync-database [cruft :as cruft]
                                    [fks :as fks]
                                    [fields :as sync-fields]
                                    [metabase-metadata :as metabase-metadata]
                                    [tables :as sync-tables])
            [metabase.util :as u])
  (:import metabase.models.database.DatabaseInstance))

(defn- database-logging-name ^String [database]
  (format "%s database '%s'" (name (driver/database->driver database)) (:name database)))


;;; ------------------------------------------------------------ SYNC MIDDLEWARE FNS ------------------------------------------------------------

;; IDs of databases that are currently being synced (so we don't trigger multiple syncs for the same DB).
(defonce ^:private currently-syncing-db-ids
  (atom #{}))

(defn- profile-sync [sync!]
  (fn [database]
    (log/info (u/format-color 'magenta "Introspecting schema on %s..."
                              (database-logging-name database)))
    (let [start-time-ns (System/nanoTime)]
      (sync! database)
      (log/info (u/format-color 'magenta "Introspection completed on %s (%s)"
                                (database-logging-name database)
                                (u/format-nanoseconds (- (System/nanoTime) start-time-ns)))))))

(defn- check-not-already-syncing [sync!]
  (fn [database]
    (println "@currently-syncing-db-ids:" @currently-syncing-db-ids) ; NOCOMMIT
    (when-not (contains? @currently-syncing-db-ids (u/get-id database))
      (try
        (swap! currently-syncing-db-ids conj (u/get-id database))
        (println "@currently-syncing-db-ids:" @currently-syncing-db-ids) ; NOCOMMIT
        (sync! database)
        (finally
          (swap! currently-syncing-db-ids disj (u/get-id database))
          (println "@currently-syncing-db-ids:" @currently-syncing-db-ids) ; NOCOMMIT
          )))))

(defn- disable-db-logging [sync!]
  (fn [database]
    (binding [qpi/*disable-qp-logging* true
              db/*disable-db-logging*  true]
      (sync! database))))


;;; ------------------------------------------------------------ SYNC LOGIC ------------------------------------------------------------

(def ^:private sync-steps
  "Various functions that are ran sequentailly to handle DB syncing.
   Each step is self-contained and should take a single argument, DATABASE."
  [sync-tables/sync-tables!
   cruft/hide-crufty-tables!
   sync-fields/sync-fields!
   fks/sync-fks!
   metabase-metadata/sync-metabase-metadata-table!])

(defn- run-sync-step!
  "Run a single sync step function F by passing it DATABASE.
   Catch and log any exceptions."
  [f database]
  (log/debug "Running sync step" f)
  (try
    (f database)
    (catch Throwable e
      (log/error "Error running sync step" f ":" e))))

(defn- do-sync-steps!
  "Perform all the `sync-steps` for DATABASE."
  [database]
  (doseq [f sync-steps]
    (run-sync-step! f database)))

(s/defn ^:always-validate sync-database!
  [database :- DatabaseInstance]
  ((-> do-sync-steps!
       profile-sync
       disable-db-logging
       check-not-already-syncing) database))
