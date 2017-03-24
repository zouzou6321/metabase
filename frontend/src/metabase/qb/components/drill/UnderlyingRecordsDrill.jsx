/* @flow weak */

import React from "react";

import { drillUnderlyingRecords } from "metabase/qb/lib/actions";

export default ({ card, tableMetadata, clicked }) => {
    if (!clicked || !clicked.column || clicked.column.id == null) {
        return;
    }

    return {
        title: (
            <span>
                View these
                {" "}
                <span className="text-dark">{tableMetadata.display_name}</span>
            </span>
        ),
        card: () => drillUnderlyingRecords(card, clicked.value, clicked.column)
    };
};
