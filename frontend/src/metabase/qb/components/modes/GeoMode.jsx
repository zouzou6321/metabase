/* @flow */

import { UnderlyingDataAction, UnderlyingRecordsAction } from "metabase/qb/components/Actions";

export const name = "geo";

export const getSidebarActions = () => {
    return [
        UnderlyingDataAction,
        UnderlyingRecordsAction
    ];
}
