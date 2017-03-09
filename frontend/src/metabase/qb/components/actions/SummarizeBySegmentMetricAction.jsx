/* @flow */

import React, { Component, PropTypes } from "react";

import AggregationPopover from "metabase/qb/components/gui/AggregationPopover";

import Query from "metabase/lib/query";

export default ({ card, tableMetadata }) => {
    return {
        title: "Summarize by a metric in this segment",
        icon: "funnel", // FIXME: icon
        popover: ({ onClose }) => (
            <AggregationPopover
                tableMetadata={tableMetadata}
                customFields={Query.getExpressions(card.dataset_query.query)}
                availableAggregations={tableMetadata.aggregation_options}
                onCommitAggregation={aggregation => {
                    onClose && onClose();
                }}
            />
        )
    };
};
