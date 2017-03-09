/* @flow */

import Utils from "metabase/lib/utils";
import moment from "moment";

import { startNewCard } from "metabase/lib/card";

export const toUnderlyingData = card => {
    const newCard = startNewCard("query");
    newCard.dataset_query = card.dataset_query;
    newCard.display = "table";
    return newCard;
};

export const toUnderlyingRecords = card => {
    const newCard = startNewCard(
        "query",
        card.dataset_query.database,
        card.dataset_query.query.source_table
    );
    return newCard;
};

const UNITS = ["minute", "hour", "day", "week", "month", "quarter", "year"];

export const drillTimeseriesFilter = (card, value, col) => {
    const newCard = startNewCard("query");

    newCard.display = card.display;
    newCard.dataset_query = card.dataset_query;
    newCard.visualization_settings = card.visualization_settings;

    let nextUnit = UNITS[Math.max(0, UNITS.indexOf(col.unit) - 1)];

    newCard.dataset_query.query.filter = [
        "=",
        ["datetime-field", col.id, "as", col.unit],
        moment(value).toISOString()
    ];
    newCard.dataset_query.query.breakout[0] = [
        "datetime-field",
        card.dataset_query.query.breakout[0][1],
        "as",
        nextUnit
    ];

    return newCard;
};

export const plotSegmentField = card => {
    const newCard = startNewCard("query");
    newCard.display = "bar";
    newCard.dataset_query = card.dataset_query;
    return newCard;
};
