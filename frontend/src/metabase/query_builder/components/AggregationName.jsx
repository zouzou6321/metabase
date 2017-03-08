/* @flow */

import React, { Component, PropTypes } from "react";

import FieldName from './FieldName.jsx';

import Query, { AggregationClause, NamedClause } from "metabase/lib/query";
import { getAggregator } from "metabase/lib/schema_metadata";
import { format } from "metabase/lib/expressions/formatter";

import _ from "underscore";

type Props = {
};

const AggregationName = (props: Props) =>
    NamedClause.isNamed(props.aggregation) ?
        <NamedAggregation {...props} />
    : AggregationClause.isCustom(props.aggregation) ?
        <CustomAggregation {...props} />
    : AggregationClause.isMetric(props.aggregation) ?
        <MetricAggregation {...props} />
    :
        <StandardAggregation {...props} />

const NamedAggregation = ({ aggregation }) =>
    <span>{NamedClause.getName(aggregation)}</span>

const StandardAggregation = ({ aggregation, tableMetadata }) => {
    const fieldId = AggregationClause.getField(aggregation);

    let selectedAggregation = getAggregator(AggregationClause.getOperator(aggregation));
    if (selectedAggregation && _.findWhere(tableMetadata.aggregation_options, { short: selectedAggregation.short })) {
        return (
            <span>
                { selectedAggregation.name.replace(" of ...", "") }
                { fieldId &&
                    <span>of</span>
                }
                { fieldId &&
                    <FieldName
                        tableMetadata={tableMetadata}
                        field={fieldId}
                        fieldOptions={Query.getFieldOptions(tableMetadata.fields, true)}
                        customFieldOptions={this.props.customFields}
                    />
                }
            </span>
        );
    }
    return null;
}

const MetricAggregation = ({ aggregation, tableMetadata }) => {
    const metricId = AggregationClause.getMetric(aggregation);
    const selectedMetric = _.findWhere(tableMetadata.metrics, { id: metricId });
    if (selectedMetric) {
        return <span>{selectedMetric.name}</span>;
    }
    return null;
}

const CustomAggregation = ({ aggregation, tableMetadata, customFields }) =>
    <span>{format(aggregation, { tableMetadata, customFields })}</span>

export default AggregationName;
