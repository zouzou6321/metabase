/* @flow */

import { UnderlyingDataAction, UnderlyingRecordsAction } from "metabase/qb/components/Actions";

export const name = "pivot";

export const getSidebarActions = () => {
    return [
        UnderlyingDataAction,
        UnderlyingRecordsAction
    ];
}
