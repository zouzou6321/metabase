/* @flow weak */

import React, { Component, PropTypes } from "react";

type Props = {};

const SidebarSection = ({ className, children, ...props }: Props) => (
    <div {...props} className={"p2 " + (className || "")}>
        {children}
    </div>
);

export default SidebarSection;
