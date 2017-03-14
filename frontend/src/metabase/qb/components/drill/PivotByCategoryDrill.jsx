/* @flow */

import React, { Component, PropTypes } from "react";

import PivotByCategoryAction from "../actions/PivotByCategoryAction";
import FilterDrill from "./TimeseriesFilterDrill";

export default ({ card, tableMetadata, clicked }) => {
    return PivotByCategoryAction({ card, tableMetadata, clicked });
};
