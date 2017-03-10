/* @flow */

import React, { Component, PropTypes } from "react";

import cx from "classnames";

const GuiSection = ({ title, titleClass, children }) => (
    <div className="mb3">
        {title &&
            <GuiSectionHeader className={titleClass}>{title}</GuiSectionHeader>}
        {children}
    </div>
);

const GuiSectionHeader = ({ children, className = "text-grey-3" }) => (
    <div className={cx(className, "mb1 h5 text-uppercase text-bold")}>
        {children}
    </div>
);

export default GuiSection;
