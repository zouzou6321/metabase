/* @flow weak */

import { DEFAULT_ACTIONS } from "../actions";
import { DEFAULT_DRILLS } from "../drill";

import PivotByCategoryAction from "../actions/PivotByCategoryAction";
import PivotByLocationAction from "../actions/PivotByLocationAction";
import PivotByTimeAction from "../actions/PivotByTimeAction";

export default {
    name: "metric",

    getActions() {
        return DEFAULT_ACTIONS.concat([
            PivotByCategoryAction,
            PivotByLocationAction,
            PivotByTimeAction
        ]);
    },

    getDrills() {
        return DEFAULT_DRILLS;
    }
};
