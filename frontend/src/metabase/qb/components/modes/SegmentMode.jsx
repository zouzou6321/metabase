/* @flow */

import UnderlyingDataAction from "../actions/UnderlyingDataAction";

export default {
    name: "segment",

    getSidebarActions() {
        return [UnderlyingDataAction];
    }
};
