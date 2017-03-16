/* @flow weak */

import React, { Component, PropTypes } from "react";

import GuiSectionHeader from "./GuiSectionHeader";

const GuiSection = ({ title, titleClass, children }) => (
    <div className="mb2">
        {title &&
            <GuiSectionHeader className={titleClass}>{title}</GuiSectionHeader>}
        {children}
    </div>
);

export default GuiSection;
