/* @flow */

import { UnderlyingDataAction, UnderlyingRecordsAction } from "metabase/qb/components/Actions";

export const name = "default";

export const getSidebarActions = () => {
    return [
        UnderlyingDataAction,
        UnderlyingRecordsAction
    ];
}
