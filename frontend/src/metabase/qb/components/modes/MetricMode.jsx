/* @flow weak */

import UnderlyingDataAction from "../actions/UnderlyingDataAction";
import UnderlyingRecordsAction from "../actions/UnderlyingRecordsAction";
import PivotByCategoryAction from "../actions/PivotByCategoryAction";
import PivotByLocationAction from "../actions/PivotByLocationAction";
import PivotByTimeAction from "../actions/PivotByTimeAction";

export default {
    name: "metric",

    getMetricActions() {
        return [
            UnderlyingDataAction,
            UnderlyingRecordsAction,
            PivotByCategoryAction,
            PivotByLocationAction,
            PivotByTimeAction
        ];
    }
};
