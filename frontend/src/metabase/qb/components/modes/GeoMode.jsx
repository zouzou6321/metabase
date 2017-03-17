/* @flow weak */

import UnderlyingDataAction from "../actions/UnderlyingDataAction";
import UnderlyingRecordsAction from "../actions/UnderlyingRecordsAction";
import PivotByCategoryAction from "../actions/PivotByCategoryAction";
import PivotByTimeAction from "../actions/PivotByTimeAction";

import UnderlyingRecordsDrill from "../drill/UnderlyingRecordsDrill";

export default {
    name: "geo",

    getMetricActions() {
        return [
            UnderlyingDataAction,
            UnderlyingRecordsAction,
            PivotByCategoryAction,
            PivotByTimeAction
        ];
    },

    getDrillThroughActions() {
        return [UnderlyingRecordsDrill];
    }
};
