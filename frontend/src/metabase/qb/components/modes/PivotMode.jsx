/* @flow weak */

import UnderlyingDataAction from "../actions/UnderlyingDataAction";
import UnderlyingRecordsAction from "../actions/UnderlyingRecordsAction";
import PivotByCategoryAction from "../actions/PivotByCategoryAction";
import PivotByLocationAction from "../actions/PivotByLocationAction";
import PivotByTimeAction from "../actions/PivotByTimeAction";

import UnderlyingRecordsDrill from "../drill/UnderlyingRecordsDrill";

export default {
    name: "pivot",

    getMetricActions() {
        return [
            UnderlyingDataAction,
            UnderlyingRecordsAction,
            PivotByCategoryAction,
            PivotByLocationAction,
            PivotByTimeAction
        ];
    },

    getDrillThroughActions() {
        return [UnderlyingRecordsDrill];
    }
};
