/* @flow */

import React, { Component, PropTypes } from "react";

import VisualizationPicker from "metabase/qb/components/VisualizationPicker";
import CustomizeSettingsWidget from "metabase/qb/components/CustomizeSettingsWidget";
import TimeseriesGroupingWidget from "metabase/qb/components/TimeseriesGroupingWidget";

import SidebarSection from "metabase/qb/components/sidebar/SidebarSection";

import { UnderlyingDataAction, UnderlyingRecordsAction } from "metabase/qb/components/Actions";

import { getTimeseriesParameters } from "metabase/meta/Parameter";

export const name = "timeseries";

export const ModeSidebarFooter = (props) =>
    <SidebarSection className="flex align-center">
        <VisualizationPicker {...props} visualizations={["line", "area", "bar"]} />
        <div className="ml-auto">
            <CustomizeSettingsWidget {...props} />
        </div>
    </SidebarSection>

export const ModeFooter = (props) => {
    return (
        <div className="flex layout-centered">
            <TimeseriesGroupingWidget {...props} />
        </div>
    )
}

export const getModeParameters = (card, tableMetadata) => {
    return getTimeseriesParameters(card, tableMetadata);
}

export const getSidebarActions = () => {
    return [
        UnderlyingDataAction,
        UnderlyingRecordsAction
    ];
}

export const getDrillThroughActions = () => {
    return [
        TimeseriesDrillThrough
    ];
}

import * as Query from "metabase/lib/query/query";
import * as Card from "metabase/meta/Card";
import Utils from "metabase/lib/utils";
import moment from "moment";

const units = [
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "quarter",
    "year"
]

const TimeseriesDrillThrough = (card, tableMetadata, clicked) => {
    card = Utils.copy(card);

    let nextUnit = units[Math.max(0, units.indexOf(clicked.col.unit) - 1)];

    card.dataset_query.query.filter = ["=", ["datetime-field", clicked.col.id, "as", clicked.col.unit], moment(clicked.value).toISOString()];
    card.dataset_query.query.breakout[0] = ["datetime-field", card.dataset_query.query.breakout[0][1], "as", nextUnit];

    return {
        title: `View this ${clicked.col.unit}`,
        card: card
    };
}
