/* @flow */

import React from "react";

import { drillUnderlyingRecords } from "metabase/qb/lib/actions";

export default ({ card, tableMetadata, clicked }) => {
    if (!clicked) {
        return;
    }

    return {
        title: (
            <span>
                View these records
            </span>
        ),
        card: () => drillUnderlyingRecords(card, clicked.value, clicked.col)
    };
};
