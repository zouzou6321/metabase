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

    //
    console.log('descriptor ---------------------', descriptor)

    series = series[0]
    const query = series.card.dataset_query.query

    let categories = suggestionsForQuery(query)
    // let categories = [
    //     {
    //         categoryName: 'Row',
    //         suggestions: [{ name: 'Derp', url: 'derp' }]
    //     },
    //     {
    //         categoryName: 'Row category 2',
    //         suggestions: [{ name: 'Derp2 ', url: 'derp' }]
    //     }
    // ]

    if (descriptor.row && descriptor.cell) {
        categories = suggestionsForCell(
            query,
            descriptor.row,
            descriptor.cols,
            descriptor.cellIndex
        )
    }

    // if(descriptor.row && !descriptor.cell) {
    //     // categories = suggestionsForRow()
    // }

    return async (): Object => ({ descriptor, categories })
});
