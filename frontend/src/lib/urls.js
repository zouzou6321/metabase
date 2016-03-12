// provides functions for building urls to things we care about
var Urls = {
    card: function(card_id) {
        // NOTE that this is for an ephemeral card link, not an editable card
        return "/card/"+card_id;
    },

    dashboard: function(dashboard_id) {
        return "/dash/"+dashboard_id;
    },

    modelToUrl: function(model, model_id) {
        switch (model) {
            case "card":      return Urls.card(model_id);
            case "dashboard": return Urls.dashboard(model_id);
            case "pulse":     return Urls.pulse(model_id);
            default:          return null;
        }
    },

    pulse: function(pulse_id) {
        return "/pulse/#"+pulse_id;
    },

    tableRowsQuery: function(database_id, table_id, metric_id, segment_id) {
        let url = "/q/?db="+database_id+"&table="+table_id;

        if (metric_id) {
            url = url + "&metric="+metric_id;
        }

        if (segment_id) {
            url = url + "&segment="+segment_id;
        }

        return url;
    }
}

/* given a location and a path determine if the current path is active
   used to determine if a nav item is active
*/
export const isActive = (location, path) => location.path().indexOf(path) >= 0;

export default Urls;
