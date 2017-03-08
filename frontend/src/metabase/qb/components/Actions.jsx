import React from "react";

import SidebarTopAction from "metabase/qb/components/sidebar/SidebarTopAction";
import QueryButton from "metabase/qb/containers/QueryButton";

import * as Query from "metabase/lib/query/query";

import { toUnderlyingData, toUnderlyingRecords } from "metabase/qb/lib/actions";

const Action = ({ card, ...props }) =>
    <QueryButton card={card}>
        <SidebarTopAction {...props} />
    </QueryButton>

export const UnderlyingDataAction = ({ card, tableMetadata }) =>
    <Action icon="table" card={toUnderlyingData(card)}>
        <span>View the underlying data</span>
    </Action>;

UnderlyingDataAction.isValid = (card, tableMetadata) => card.display !== "table" && card.display !== "scalar";

export const UnderlyingRecordsAction = ({ card, tableMetadata }) =>
    <Action icon="table" card={toUnderlyingRecords(card)}>
        <span>View the underlying <span className="text-dark">{tableMetadata.display_name}</span> records</span>
    </Action>;

UnderlyingRecordsAction.isValid = (card, tableMetadata) => !Query.isBareRows(card.dataset_query.query);

export const PivotByLocationAction = ({ card, tableMetadata }) =>
    <Action icon="location">
        <span>Pivot by <span className="text-dark">Location</span></span>
    </Action>

export const PivotByCategoryAction = ({ card, tableMetadata }) =>
    <Action icon="label">
        <span>Pivot by a <span className="text-dark">Category</span></span>
    </Action>

// FIXME: icon
export const ExploreMetricAction = ({ card, tableMetadata }) =>
    <Action icon="clock">
        <span>Explore <span className="text-dark">METRIC NAME</span></span>
    </Action>

export const PlotSegmentField = ({ card, tableMetadata }) =>
    <Action icon="bar">
        <span>Plot a field in this segment</span>
    </Action>

// FIXME: icon
export const SummarizeBySegmentMetric = ({ card, tableMetadata }) =>
    <Action icon="funnel">
        <span>Summarize by a metric in this segment</span>
    </Action>
