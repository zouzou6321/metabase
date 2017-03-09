import React, { Component, PropTypes } from "react";

import FieldName from "./FieldName.jsx";

import Query, { AggregationClause, NamedClause } from "metabase/lib/query";
import { getAggregator } from "metabase/lib/schema_metadata";
import { format } from "metabase/lib/expressions/formatter";

import _ from "underscore";

const StandardAggregation = ({ aggregation, tableMetadata, customFields }) => {
    const fieldId = AggregationClause.getField(aggregation);
    const selectedAggregation = getAggregator(
        AggregationClause.getOperator(aggregation)
    );
    // if this table doesn't support the selected aggregation, prompt the user to select a different one
    if (
        selectedAggregation &&
        _.findWhere(tableMetadata.aggregation_options, {
            short: selectedAggregation.short
        })
    ) {
        return (
            <span>
                <span className="text-bold">
                    {selectedAggregation.name.replace(" of ...", "")}
                </span>
                {fieldId && <span> of </span>}
                {fieldId &&
                    <FieldName
                        className="text-bold"
                        tableMetadata={tableMetadata}
                        field={fieldId}
                        fieldOptions={Query.getFieldOptions(
                            tableMetadata.fields,
                            true
                        )}
                        customFieldOptions={customFields}
                    />}
            </span>
        );
    }
};

const MetricAggregation = ({ aggregation, tableMetadata }) => {
    const metricId = AggregationClause.getMetric(aggregation);
    const selectedMetric = _.findWhere(tableMetadata.metrics, { id: metricId });
    if (selectedMetric) {
        return selectedMetric.name.replace(" of ...", "");
    }
};

const CustomAggregation = ({ aggregation, tableMetadata, customFields }) =>
    format(aggregation, { tableMetadata, customFields });

const NamedAggregation = ({ aggregation, className }) =>
    NamedClause.getName(aggregation);

const AggregationName = (
    { aggregation, tableMetadata, customFields, className }
) => {
    let name = NamedClause.isNamed(aggregation)
        ? NamedAggregation({ aggregation, tableMetadata, customFields })
        : AggregationClause.isCustom(aggregation)
              ? CustomAggregation({ aggregation, tableMetadata, customFields })
              : AggregationClause.isMetric(aggregation)
                    ? MetricAggregation({
                          aggregation,
                          tableMetadata,
                          customFields
                      })
                    : StandardAggregation({
                          aggregation,
                          tableMetadata,
                          customFields
                      });
    if (!name) {
        ("Unknown");
    }
    return <span className={className}>{name}</span>;
};

export default AggregationName;
