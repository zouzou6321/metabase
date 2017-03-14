/* @flow */

import React from "react";

import { drillTimeseriesFilter } from "metabase/qb/lib/actions";

export default ({ card, tableMetadata, clicked }) => {
    if (!clicked || !clicked.col.unit) {
        return;
    }

    return {
        title: (
            <span>
                View this <span className="text-dark">{clicked.col.unit}</span>
            </span>
        ),
        card: () => drillTimeseriesFilter(card, clicked.value, clicked.col)
    };
};
