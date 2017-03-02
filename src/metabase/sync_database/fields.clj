(ns metabase.sync-database.fields
  "Logic for syncing the Fields belonging to a Database.

   This does a few steps:

   1.  Mark fields belonging to inactive tables as inactive and retired (why?)
   2.  Mark other fields that no longer exist as inactive and retired
   3.  Create new fields as needed for new physical columns"
  (:require [toucan.db :as db]
            [metabase.driver :as driver]))

(defn sync-fields! [database])
