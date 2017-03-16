/* @flow weak */

import UnderlyingDataAction from "../actions/UnderlyingDataAction";
import UnderlyingRecordsAction from "../actions/UnderlyingRecordsAction";
import PivotByCategoryAction from "../actions/PivotByCategoryAction";
import PivotByLocationAction from "../actions/PivotByLocationAction";

import UnderlyingRecordsDrill from "../drill/UnderlyingRecordsDrill";

export default {
    name: "geo",

    getMetricActions() {
        return [
            UnderlyingDataAction,
            UnderlyingRecordsAction,
            PivotByCategoryAction,
            PivotByLocationAction
        ];
    },

    getDrillThroughActions() {
        return [UnderlyingRecordsDrill];
    }
};
