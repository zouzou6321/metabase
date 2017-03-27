/* @flow weak */

import React, { Component, PropTypes } from "react";

import GuiClauseEditor from "./GuiClauseEditor";
import AggregationName from "./AggregationName";
import AggregationPopover from "./AggregationPopover";

import Query from "metabase/lib/query";

const AggregationSection = (
    {
        datasetQuery,
        tableMetadata,
        updateQueryAggregation,
        removeQueryAggregation
    }
) => {
    let aggregations = Query.getAggregations(datasetQuery.query);
    return (
        <GuiClauseEditor
            title="Metrics"
            titleClass="text-green"
            items={aggregations}
            canAdd
            renderItem={({ item, index, ...props }) => (
                <AggregationName
                    {...props}
                    aggregation={item}
                    tableMetadata={tableMetadata}
                    customFields={Query.getExpressions(datasetQuery.query)}
                />
            )}
            renderEdit={({ item, index, ...props }) => (
                <AggregationPopover
                    {...props}
                    aggregation={item}
                    tableMetadata={tableMetadata}
                    customFields={Query.getExpressions(datasetQuery.query)}
                    availableAggregations={tableMetadata.aggregation_options}
                    onCommitAggregation={aggregation =>
                        updateQueryAggregation(index, aggregation)}
                />
            )}
            onRemove={({ item, index }) => removeQueryAggregation(index)}
        />
    );
};

export default AggregationSection;
