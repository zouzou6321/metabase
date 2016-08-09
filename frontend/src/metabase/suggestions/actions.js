/* @flow */

import { createThunkAction } from "metabase/lib/redux";
import {
    suggestionsForQuery,
    suggestionsForCell,
    suggestionsForRow
} from "metabase/lib/recommenders/recommenders";

export type Series = []

export type SuggestionCategory = {
    categoryName: string,
    suggestions: Array<Suggestion>
}

export type SuggestionCategories = SuggestionCategory[]

export type Suggestion = {
    name: string,
    url: string
}

export type Descriptor = {
    series: ?Series, // dataset_query
    column: ?Object,
    row: ?Object
}

export const UPDATE_SUGGESTIONS = 'UPDATE_SUGGESTIONS';

export const updateSuggestions = createThunkAction(UPDATE_SUGGESTIONS, (series: Series, descriptor: Descriptor) => {

    series = series[0]
    const query = series.card.dataset_query.query

    let categories

    if (descriptor.row) {
        categories = suggestionsForCell(
            query,
            descriptor.row,
            descriptor.cols,
            descriptor.cellIndex
        )
    }

    if(descriptor.row && !descriptor.cell) {
        // categories = suggestionsForRow()
    }

    categories = suggestionsForQuery(query)

    return async (): Object => ({ descriptor, categories })
});
