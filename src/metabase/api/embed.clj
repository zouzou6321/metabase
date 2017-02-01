(ns metabase.api.embed
  "Various endpoints that use [JSON web tokens](https://jwt.io/introduction/) to fetch Cards and Dashboards.
   The endpoints are the same as the ones in `api/public/`, and differ only in the way they are authorized.

   To use these endpoints:

    1.  Set the `embedding-secret-key` Setting to a hexadecimal-encoded 32-byte sequence (i.e., a 64-character string).
        You can use `/api/util/random_token` to get a cryptographically-secure value for this.
    2.  Sign/base-64 encode a JSON Web Token using the secret key and pass it as the relevant part of the URL path
        to the various endpoints here.

   Tokens can have the following fields:

      {:resource {:card      <card-id>
                  :dashboard <dashboard-id>}
       :params   <params>}"
  (:require [buddy.sign.jwt :as jwt]
            [compojure.core :refer [GET]]
            (metabase.api [common :as api]
                          [dataset :as dataset-api]
                          [public :as public-api])
            [metabase.models.setting :as setting]))


;;; ------------------------------------------------------------ Setting & Util Fns ------------------------------------------------------------

(setting/defsetting ^:private embedding-secret-key
  "Secret key used to sign JSON Web Tokens for requests to `/api/embed` endpoints."
  :setter (fn [new-value]
            (when (seq new-value)
              (assert (re-matches #"[0-9a-f]{64}" new-value)
                "Invalid embedding-secret-key! Secret key must be a hexadecimal-encoded 32-byte sequence (i.e., a 64-character string)."))
            (setting/set-string! :embedding-secret-key new-value)))


(defn- unsign [^String message]
  (when (seq message)
    (jwt/unsign message (or (embedding-secret-key)
                            (throw (ex-info "The embedding secret key has not been set." {:status-code 400}))))))

(defn- get-in-unsigned-token-or-throw [unsigned-token keyseq]
  (or (get-in unsigned-token keyseq)
      (throw (ex-info (str "Token is missing value for keypath" keyseq) {:status-code 400}))))


;;; ------------------------------------------------------------ Cards ------------------------------------------------------------

(api/defendpoint GET "/card/:token"
  "Fetch a Card via a JSON Web Token signed with the `embedding-secret-key`.

   Token should have the following format:

     {:resource {:card <card-id>}}"
  [token]
  (public-api/public-card :id (get-in-unsigned-token-or-throw (unsign token) [:resource :card])))


(defn- run-query-for-unsigned-token [unsigned-token & options]
  (apply public-api/run-query-for-card-with-id (get-in-unsigned-token-or-throw unsigned-token [:resource :card]) (:parameters unsigned-token) options))


(api/defendpoint GET "/card/:token/query"
  "Fetch the results of running a Card using a JSON Web Token signed with the `embedding-secret-key`.

   Token should have the following format:

     {:resource   {:card <card-id>}
      :parameters <parameters>}"
  [token]
  (run-query-for-unsigned-token (unsign token)))


(api/defendpoint GET "/card/:token/query/csv"
  "Like `GET /api/embed/card/query`, but returns the results as CSV."
  [token]
  (dataset-api/as-csv (run-query-for-unsigned-token (unsign token), :constraints nil)))


(api/defendpoint GET "/card/:token/query/json"
  "Like `GET /api/embed/card/query`, but returns the results as JSOn."
  [token]
  (dataset-api/as-json (run-query-for-unsigned-token (unsign token), :constraints nil)))


;;; ------------------------------------------------------------ Dashboards ------------------------------------------------------------

(defn- merge-params
  "FIXME: NOT SECURE.
  This should actually occur in the /dashboard/:token/card/:card-id endpoint using parameter_mappings"
  [token-params parameters]
  ; fake JWT token-enforced parameter values:
  (map (fn [parameter] (assoc parameter :FIXME_value ((keyword (:slug parameter)) token-params))) parameters))

(api/defendpoint GET "/dashboard/:token"
  "Fetch a Dashboard via a JSON Web Token signed with the `embedding-secret-key`.

   Token should have the following format:

     {:resource {:dashboard <dashboard-id>}}"
  [token]
  (let [unsigned  (unsign token)
        id        (get-in-unsigned-token-or-throw unsigned [:resource :dashboard])
        dashboard (public-api/public-dashboard :id id)]
    (update dashboard :parameters (partial merge-params (:params unsigned)))))

(api/defendpoint GET "/dashboard/:token/card/:card-id"
  "Fetch the results of running a Card belonging to a Dashboard using a JSON Web Token signed with the `embedding-secret-key`.

   Token should have the following format:

     {:resource   {:dashboard <dashboard-id>}
      :parameters <parameters>}"
  [token card-id parameters]
  (let [token (unsign token)]
    (public-api/public-dashcard-results (get-in-unsigned-token-or-throw token [:resource :dashboard])
                                        card-id
                                        parameters)))


(api/define-routes)
