/* @flow weak */

import React, { Component, PropTypes } from "react";

import Sidebar from "./Sidebar";
import SidebarHeader from "./SidebarHeader";
import SidebarSection from "./SidebarSection";
import QueryBuilderSidebarSection from "./QueryBuilderSidebarSection";

type Props = {};

const CustomizeSidebar = (props: Props) => {
    const {
        onClose,
        ...rest
    } = props;

    return (
        <Sidebar {...rest}>
            <SidebarSection>
                <SidebarHeader onClose={onClose}>
                    Customize
                </SidebarHeader>
            </SidebarSection>
            <QueryBuilderSidebarSection {...props} />
        </Sidebar>
    );
};

export default CustomizeSidebar;
