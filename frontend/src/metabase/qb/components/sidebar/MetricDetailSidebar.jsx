/* @flow weak */

import React, { Component, PropTypes } from "react";

import Sidebar from "./Sidebar";
import SidebarHeader from "./SidebarHeader";
import SidebarSection from "./SidebarSection";
import QueryBuilderSidebarSection from "./QueryBuilderSidebarSection";

import { getActions } from "./MetricActions";

type Props = {};

const MetricDetailSidebar = (props: Props) => {
    const {
        metric,
        onClose,
        ...rest
    } = props;

    return (
        <Sidebar {...rest}>
            <SidebarSection>
                <SidebarHeader onClose={onClose}>
                    {metric.name}
                </SidebarHeader>
            </SidebarSection>
            <QueryBuilderSidebarSection
                {...props}
                features={{ filter: true, breakout: true }}
            />
            {getActions(props)}
        </Sidebar>
    );
};

export default MetricDetailSidebar;
