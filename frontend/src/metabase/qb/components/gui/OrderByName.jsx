/* @flow weak */

import React, { Component, PropTypes } from "react";

import FieldName from "./FieldName";
import { capitalize } from "metabase/lib/formatting";

const OrderByName = ({ className, orderBy, ...props }) => (
    <span className={className}>
        <FieldName {...props} field={orderBy && orderBy[0]} />
        {orderBy && ": "}
        {orderBy && capitalize(orderBy[1])}
    </span>
);

export default OrderByName;
