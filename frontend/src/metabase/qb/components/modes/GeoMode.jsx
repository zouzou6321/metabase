/* @flow */

import UnderlyingDataAction from "../actions/UnderlyingDataAction";
import UnderlyingRecordsAction from "../actions/UnderlyingRecordsAction";

export default {
    name: "geo",

    getSidebarActions() {
        return [UnderlyingDataAction, UnderlyingRecordsAction];
    }
};
