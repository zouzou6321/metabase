/* @flow */

import UnderlyingDataAction from "../actions/UnderlyingDataAction";
import UnderlyingRecordsAction from "../actions/UnderlyingRecordsAction";

export default {
    name: "metric",

    getSidebarActions() {
        return [UnderlyingDataAction, UnderlyingRecordsAction];
    }
};
