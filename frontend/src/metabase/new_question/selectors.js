import {
    isDate,
    isNumber,
    isCategory,
    isCountry,
    isState,
} from 'metabase/lib/schema_metadata';

import { normal } from 'metabase/lib/colors';

import { createSelector } from "reselect";
import { getTables, getMetrics, getFields } from "metabase/selectors/metadata";

export const currentTip         = state => state.newQuestion.currentStep.tip;
export const currentStepTitle   = state => state.newQuestion.currentStep.title;

// TODO this is a hellscape, not meant for human eyes to see
export const getSelectedTable = state => {
    if(state.newQuestion.card.dataset_query && state.newQuestion.card.dataset_query.query) {
        return state.newQuestion.card.dataset_query.query.source_table
    }
    return null;
}

export const getSelectedTableMetadata = createSelector(
    [getSelectedTable, getTables],
    (selectedTable, tables) =>
        selectedTable != null ? tables[selectedTable] : null
);

export const getCurrentFlowType = state => state.newQuestion.flow.type

export const breakoutsByCategory = state => {
    const rawFields = state.metadata.tables[getSelectedTable(state)].fields_lookup
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

import Query from "metabase/lib/query";

const FIELD_FILTERS_BY_FLOW_TYPE = {
    "timeseries": isDate,
    "map": (field) => isCountry(field) || isState(field),
    "default": () => true
}

export const getMetricsForCurrentFlow = createSelector(
    [getCurrentFlowType, getMetrics, getTables, getFields],
    (currentFlowType, metrics, tables, fields) => {
        let fieldFilter = FIELD_FILTERS_BY_FLOW_TYPE[currentFlowType] || FIELD_FILTERS_BY_FLOW_TYPE["default"];
        return Object.values(metrics).filter(metric => {
            const tableMetadata = tables[metric.table_id];
            const fieldOptions = Query.getFieldOptions(
                tableMetadata.fields.map(fieldId => fields[fieldId]),
                true,
                (fields) => tableMetadata.breakout_options.validFieldsFilter(fields).filter(fieldFilter)
            );
            return fieldOptions.count > 0;
        })
    }
);
