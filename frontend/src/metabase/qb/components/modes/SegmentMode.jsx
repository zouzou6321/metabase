/* @flow */

import React from "react";

import QueryBuilderSidebarSection from "../sidebar/QueryBuilderSidebarSection";

import SummarizeBySegmentMetricAction
    from "../actions/SummarizeBySegmentMetricAction";
import PlotSegmentField from "../actions/PlotSegmentField";
import UnderlyingDataAction from "../actions/UnderlyingDataAction";

export default {
    name: "segment",

    getMainSections() {
        return [SegmentMainView];
    },

    getMainActions() {
        return [
            SummarizeBySegmentMetricAction,
            PlotSegmentField,
            UnderlyingDataAction
        ];
    }
};

const SegmentMainView = props => (
    <QueryBuilderSidebarSection {...props} features={{ filter: true }} />
);
