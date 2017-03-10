/* @flow */

import UnderlyingDataAction from "../actions/UnderlyingDataAction";
import UnderlyingRecordsAction from "../actions/UnderlyingRecordsAction";

export default {
    name: "metric",

    getMetricActions() {
        return [UnderlyingDataAction, UnderlyingRecordsAction];
    }
};
