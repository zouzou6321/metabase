/* @flow weak */

import React, { Component, PropTypes } from "react";

import FieldName from "./FieldName";

const BreakoutName = ({ breakout, ...props }) => (
    <FieldName field={breakout} {...props} />
);

export default BreakoutName;
