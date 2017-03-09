/* @flow */

import UnderlyingDataAction from "../actions/UnderlyingDataAction";
import UnderlyingRecordsAction from "../actions/UnderlyingRecordsAction";

export default {
    name: "pivot",

    getMetricActions() {
        return [UnderlyingDataAction, UnderlyingRecordsAction];
    }
};
