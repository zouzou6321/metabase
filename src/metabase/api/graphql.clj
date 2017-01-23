(ns metabase.api.graphql
  "/api/graphql endpoints."
  (:require [clojure.tools.logging :as log]
            [compojure.core :refer [POST]]
            [metabase.api.common :refer :all]
            [metabase.db :as db]
            (metabase.models common
                             [hydrate :refer [hydrate]]
                             [database :refer [Database]]
                             [field :refer [Field]]
                             [interface :as models]
                             [table :refer [Table]])
            [metabase.util.graphql :as gql]
            [cheshire.core :as json]))

(defn- filter-one
  [predicate value]
  (when (and value (predicate value)) value))

(defn fetch-table-fields
  [env]
  (let [table-id (get (.getSource env) "id")]
    (filter models/can-read? (db/select Field {:order-by [:%lower.display_name]
                                               :where [:= :table_id table-id]}))))

(defn fetch-database-tables
  [env]
  (let [db-id (get (.getSource env) "id")]
    (filter models/can-read? (db/select Table {:order-by [:%lower.display_name]
                                               :where [:= :db_id db-id]}))))

(defn fetch-databases
  [env]
  (filter models/can-read? (db/select Database {:order-by [:%lower.name]})))

(defn fetch-database
  [env]
  (filter-one models/can-read? (db/select-one Database {:order-by [:%lower.name]
                                                        :where (gql/env->where env)})))

(defn fetch-table
  [env]
  (filter-one models/can-read? (db/select-one Table {:order-by [:%lower.display_name]
                                                     :where (gql/env->where env)})))

(defn fetch-field
  [env]
  (filter-one models/can-read? (db/select-one Field {:order-by [:%lower.display_name]
                                                     :where (gql/env->where env)})))

(def fieldType
  (gql/object "Field"
    (gql/field "id" :string)
    (gql/field "name" :string)
    (gql/field "display_name" :string)
    (gql/field "description" :string)))

(def tableType
  (gql/object "Table"
    (gql/field "id" :string)
    (gql/field "name" :string)
    (gql/field "display_name" :string)
    (gql/field "description" :string)
    (gql/field "fields" [fieldType]
      (gql/fetch fetch-table-fields))))

(def databaseType
  (gql/object "Database"
    (gql/field "id" :string)
    (gql/field "name" :string)
    (gql/field "tables" [tableType]
      (gql/fetch fetch-database-tables))))

(def queryType
  (gql/object "QueryType"
    (gql/field "database" databaseType
      (gql/argument "id" :string)
      (gql/fetch fetch-database))
    (gql/field "table" tableType
      (gql/argument "id" :string)
      (gql/fetch fetch-table))
    (gql/field "field" fieldType
      (gql/argument "id" :string)
      (gql/fetch fetch-field))
    (gql/field "databases" [databaseType]
      (gql/fetch fetch-databases))))

(def schema
  (gql/schema queryType))

(defendpoint POST "/"
  "GraphQL endpoint"
  [:as {{:keys [query] :as body} :body}]
  (let [executionResult (-> (new graphql.GraphQL schema) (.execute query))]
    (if (> (count (.getErrors executionResult)) 0)
      {:data   (.getData executionResult)
       :errors (.getErrors executionResult)}
      {:data (.getData executionResult)})))

(define-routes)
