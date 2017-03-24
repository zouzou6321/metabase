/* @flow weak */

import UnderlyingDataAction from "../actions/UnderlyingDataAction";
import UnderlyingRecordsAction from "../actions/UnderlyingRecordsAction";
import PivotByCategoryAction from "../actions/PivotByCategoryAction";
import PivotByLocationAction from "../actions/PivotByLocationAction";
import PivotByTimeAction from "../actions/PivotByTimeAction";

import { DEFAULT_DRILLS } from "../drill";

export default {
    name: "pivot",

    getActions() {
        return [
            UnderlyingDataAction,
            UnderlyingRecordsAction,
            PivotByCategoryAction,
            PivotByLocationAction,
            PivotByTimeAction
        ];
    },

    getDrills() {
        return DEFAULT_DRILLS;
    }
};
