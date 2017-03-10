/* @flow */

import UnderlyingDataAction from "../actions/UnderlyingDataAction";
import UnderlyingRecordsAction from "../actions/UnderlyingRecordsAction";

export default {
    name: "geo",

    getMetricActions() {
        return [UnderlyingDataAction, UnderlyingRecordsAction];
    }
};
