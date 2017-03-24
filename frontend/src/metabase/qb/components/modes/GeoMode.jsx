/* @flow weak */

import { DEFAULT_ACTIONS } from "../actions";
import { DEFAULT_DRILLS } from "../drill";

import PivotByCategoryAction from "../actions/PivotByCategoryAction";
import PivotByTimeAction from "../actions/PivotByTimeAction";

export default {
    name: "geo",

    getActions() {
        return DEFAULT_ACTIONS.concat([
            PivotByCategoryAction,
            PivotByTimeAction
        ]);
    },

    getDrills() {
        return DEFAULT_DRILLS;
    }
};
