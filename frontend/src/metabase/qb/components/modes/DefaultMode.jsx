/* @flow weak */

import UnderlyingDataAction from "../actions/UnderlyingDataAction";
import UnderlyingRecordsAction from "../actions/UnderlyingRecordsAction";
import UnderlyingRecordsDrill from "../drill/UnderlyingRecordsDrill";

export default {
    name: "default",

    getMainActions() {
        return [UnderlyingDataAction, UnderlyingRecordsAction];
    },

    getDrillThroughActions() {
        return [UnderlyingRecordsDrill];
    }
};
