/* @flow weak */

import React, { Component, PropTypes } from "react";

import VisualizationPicker from "metabase/qb/components/VisualizationPicker";
import CustomizeSettingsWidget
    from "metabase/qb/components/CustomizeSettingsWidget";
import TimeseriesGroupingWidget
    from "metabase/qb/components/TimeseriesGroupingWidget";
import TimeseriesFilterWidget
    from "metabase/qb/components/TimeseriesFilterWidget";

import SidebarSection from "metabase/qb/components/sidebar/SidebarSection";

import UnderlyingDataAction from "../actions/UnderlyingDataAction";
import UnderlyingRecordsAction from "../actions/UnderlyingRecordsAction";
import PivotByCategoryAction from "../actions/PivotByCategoryAction";
import PivotByLocationAction from "../actions/PivotByLocationAction";

import UnderlyingRecordsDrill from "../drill/UnderlyingRecordsDrill";
import TimeseriesFilterDrill from "../drill/TimeseriesFilterDrill";
import PivotByCategoryDrill from "../drill/PivotByCategoryDrill";
import PivotByLocationDrill from "../drill/PivotByLocationDrill";

import { getTimeseriesParameters } from "metabase/meta/Parameter";

export const ModeSidebarFooter = props => (
    <SidebarSection className="flex align-center">
        <VisualizationPicker
            {...props}
            visualizations={["line", "area", "bar"]}
        />
        <div className="ml-auto">
            <CustomizeSettingsWidget {...props} />
        </div>
    </SidebarSection>
);

export const ModeFooter = props => {
    return (
        <div className="flex layout-centered">
            <TimeseriesFilterWidget {...props} className="mr1" />
            <TimeseriesGroupingWidget {...props} className="mr1" />
        </div>
    );
};

export default {
    name: "timeseries",

    ModeFooter,
    ModeSidebarFooter,

    getModeParameters(card, tableMetadata) {
        return getTimeseriesParameters(card, tableMetadata);
    },

    getMetricActions() {
        return [
            UnderlyingDataAction,
            UnderlyingRecordsAction,
            PivotByCategoryAction,
            PivotByLocationAction
        ];
    },

    getDrillThroughActions() {
        return [
            TimeseriesFilterDrill,
            PivotByCategoryDrill,
            PivotByLocationDrill,
            UnderlyingRecordsDrill
        ];
    }
};
