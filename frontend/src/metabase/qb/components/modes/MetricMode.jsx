/* @flow */

import { UnderlyingDataAction, UnderlyingRecordsAction } from "metabase/qb/components/Actions";

export const name = "metric";

export const getSidebarActions = () => {
    return [
        UnderlyingDataAction,
        UnderlyingRecordsAction
    ];
}
