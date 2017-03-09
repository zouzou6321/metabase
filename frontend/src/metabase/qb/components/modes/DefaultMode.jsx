/* @flow */

import UnderlyingDataAction from "../actions/UnderlyingDataAction";
import UnderlyingRecordsAction from "../actions/UnderlyingRecordsAction";

export default {
    name: "default",

    getMainActions() {
        return [UnderlyingDataAction, UnderlyingRecordsAction];
    }
};
