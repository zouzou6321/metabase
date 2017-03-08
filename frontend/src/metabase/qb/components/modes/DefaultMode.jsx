/* @flow */

import UnderlyingDataAction from "../actions/UnderlyingDataAction";
import UnderlyingRecordsAction from "../actions/UnderlyingRecordsAction";

export default {
    name: "default",

    getSidebarActions() {
        return [UnderlyingDataAction, UnderlyingRecordsAction];
    }
};
