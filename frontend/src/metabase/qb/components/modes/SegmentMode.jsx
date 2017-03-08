/* @flow */

import { UnderlyingDataAction } from "metabase/qb/components/Actions";

export const name = "segment";

export const getSidebarActions = () => {
    return [
        UnderlyingDataAction
    ];
}
