/* @flow weak */

import React, { Component, PropTypes } from "react";

import SidebarSection from "./SidebarSection";
import SidebarSubAction from "./SidebarSubAction";

const SidebarTopAction = ({ onClick, ...props }) => (
    <SidebarSection className="bg-alt cursor-pointer" onClick={onClick}>
        <SidebarSubAction {...props} />
    </SidebarSection>
);

export default SidebarTopAction;
