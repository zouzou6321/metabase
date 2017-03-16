/* @flow weak */

import React, { Component, PropTypes } from "react";

import cx from "classnames";

const GuiSectionHeader = ({ children, className = "text-grey-3" }) => (
    <div className={cx(className, "mb1 h5 text-uppercase text-bold")}>
        {children}
    </div>
);

export default GuiSectionHeader;
