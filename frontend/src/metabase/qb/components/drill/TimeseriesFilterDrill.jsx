/* @flow */

import React from "react";

import { drillTimeseriesFilter } from "metabase/qb/lib/actions";

export default ({ card, tableMetadata, clicked }) => {
    if (!clicked || !clicked.dimensionColumn.unit) {
        return;
    }

    return {
        title: (
            <span>
                View this
                {" "}
                <span className="text-dark">
                    {clicked.dimensionColumn.unit}
                </span>
            </span>
        ),
        card: () =>
            drillTimeseriesFilter(
                card,
                clicked.dimensionValue,
                clicked.dimensionColumn
            )
    };
};
