
import {
    UnderlyingDataAction,
    UnderlyingRecordsAction
} from "metabase/qb/components/Actions";

export const getSidebarActions = () => {
    return [
        UnderlyingDataAction,
        UnderlyingRecordsAction
    ];
}
