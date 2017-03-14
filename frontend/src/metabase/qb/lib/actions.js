/* @flow */

import moment from "moment";

import * as Query from "metabase/lib/query/query";
import { startNewCard } from "metabase/lib/card";
import { isDate } from "metabase/lib/schema_metadata";

import type { Card } from "metabase/meta/types/Card";

export const toUnderlyingData = (card: Card): Card => {
    const newCard = startNewCard("query");
    newCard.dataset_query = card.dataset_query;
    newCard.display = "table";
    return newCard;
};

export const toUnderlyingRecords = (card: Card): Card => {
    const newCard = startNewCard(
        "query",
        card.dataset_query.database,
        card.dataset_query.query.source_table
    );
    newCard.dataset_query.query.filter = card.dataset_query.query.filter;
    return newCard;
};

const getFieldClauseFromCol = col => {
    if (col.fk_field_id != null) {
        return ["fk->", col.fk_field_id, col.id];
    } else {
        return ["field-id", col.id];
    }
};

const drillFilter = (card, value, col) => {
    const newCard = startNewCard("query");

    newCard.display = card.display;
    newCard.dataset_query = card.dataset_query;
    newCard.visualization_settings = card.visualization_settings;

    let filter;
    if (isDate(col)) {
        filter = [
            "=",
            ["datetime-field", getFieldClauseFromCol(col), "as", col.unit],
            moment(value).toISOString()
        ];
    } else {
        filter = ["=", getFieldClauseFromCol(col), value];
    }

    newCard.dataset_query.query = Query.addFilter(
        newCard.dataset_query.query,
        filter
    );

    return newCard;
};

const UNITS = ["minute", "hour", "day", "week", "month", "quarter", "year"];

export const drillTimeseriesFilter = (card, value, col) => {
    const newCard = drillFilter(card, value, col);

    let nextUnit = UNITS[Math.max(0, UNITS.indexOf(col.unit) - 1)];

    newCard.dataset_query.query.breakout[0] = [
        "datetime-field",
        card.dataset_query.query.breakout[0][1],
        "as",
        nextUnit
    ];

    return newCard;
};

export const drillUnderlyingRecords = (card, value, col) => {
    return toUnderlyingRecords(drillFilter(card, value, col));
};

export const plotSegmentField = card => {
    const newCard = startNewCard("query");
    newCard.display = "scatter";
    newCard.dataset_query = card.dataset_query;
    return newCard;
};

export const summarize = (card, aggregation) => {
    const newCard = startNewCard("query");
    newCard.dataset_query = card.dataset_query;
    newCard.dataset_query.query = Query.addAggregation(
        newCard.dataset_query.query,
        aggregation
    );
    newCard.display = guessVisualization(newCard);
    return newCard;
};

type DrillClick = {};

export const pivot = (card: Card, breakout, clicked: ?DrillClick): Card => {
    const newCard = drillFilter(card, clicked.value, clicked.col);
    newCard.dataset_query = card.dataset_query;
    newCard.dataset_query.query = Query.addBreakout(
        newCard.dataset_query.query,
        breakout
    );
    newCard.display = guessVisualization(newCard);
    return newCard;
};

const VISUALIZATIONS_ONE_BREAKOUTS = new Set([
    "bar",
    "line",
    "area",
    "row",
    "pie"
]);
const VISUALIZATIONS_TWO_BREAKOUTS = new Set(["bar", "line", "area"]);

const guessVisualization = (card: Card) => {
    const aggregations = Query.getAggregations(card.dataset_query.query);
    const breakouts = Query.getBreakouts(card.dataset_query.query);
    if (aggregations.length === 0 && breakouts.length === 0) {
        return "table";
    } else if (aggregations.length === 1 && breakouts.length === 0) {
        return "scalar";
    } else if (aggregations.length === 1 && breakouts.length === 1) {
        if (!VISUALIZATIONS_ONE_BREAKOUTS.has(card.display)) {
            return "bar";
        } else {
            return card.display;
        }
    } else if (aggregations.length === 1 && breakouts.length === 2) {
        if (!VISUALIZATIONS_TWO_BREAKOUTS.has(card.display)) {
            return "bar";
        } else {
            return card.display;
        }
    } else {
        console.warn("Couldn't guess visualization", card);
        return "table";
    }
};
