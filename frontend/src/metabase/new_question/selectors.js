import {
    isDate,
    isNumber,
    isCategory,
} from 'metabase/lib/schema_metadata';

import { normal } from 'metabase/lib/colors';

export const currentTip         = state => state.newQuestion.currentStep.tip;
export const currentStepTitle   = state => state.newQuestion.currentStep.title;

export const flowType           = state => state.newQuestion.flow.type

export const breakoutsByCategory = state => {
    const rawFields = state.metadata.tables[state.newQuestion.card.dataset_query.query.source_table].fields_lookup
    const fields = Object.keys(rawFields).map(field => rawFields[field])
    return {
        'date':     fields.filter(f => isDate(f)),
        'number':   fields.filter(f => isNumber(f)),
        'category':  fields.filter(f => isCategory(f)),
    }
}

export const breakoutsForDisplay = state => {
    const categories = breakoutsByCategory(state);

    return [
        {
            display_name: 'Dates',
            fields: categories['date'],
            displayColor: normal.blue,
            iconName: 'calendar'
        },
        {
            display_name: 'Numbers',
            fields: categories['number'],
            displayColor: normal.green,
            iconName: 'int'
        },
        {
            display_name: 'Categories',
            fields: categories['category'],
            displayColor: normal.indigo,
            iconName: 'label'
        }
    ]
}
