/* @flow */

import React from "react";

import Utils from "metabase/lib/utils";
import moment from "moment";

const UNITS = ["minute", "hour", "day", "week", "month", "quarter", "year"];

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
        card: () => {
            const newCard = Utils.copy(card);

            let nextUnit = UNITS[
                Math.max(0, UNITS.indexOf(clicked.col.unit) - 1)
            ];

            newCard.dataset_query.query.filter = [
                "=",
                ["datetime-field", clicked.col.id, "as", clicked.col.unit],
                moment(clicked.value).toISOString()
            ];
            newCard.dataset_query.query.breakout[0] = [
                "datetime-field",
                card.dataset_query.query.breakout[0][1],
                "as",
                nextUnit
            ];

            return newCard;
        }
    };
};
