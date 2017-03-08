/* @flow */

import { startNewCard } from "metabase/lib/card";

export const toUnderlyingData = (card) => {
    const newCard = startNewCard("query");
    newCard.dataset_query = card.dataset_query;
    newCard.display = "table";
    return newCard;
}

export const toUnderlyingRecords = (card) => {
    const newCard = startNewCard("query", card.dataset_query.database, card.dataset_query.query.source_table);
    return newCard;
}
