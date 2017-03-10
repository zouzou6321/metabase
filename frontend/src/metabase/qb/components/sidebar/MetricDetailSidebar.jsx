/* @flow */

import React, { Component, PropTypes } from "react";

import * as Query from "metabase/lib/query/query";
import * as Card from "metabase/meta/Card";

import Sidebar from "./Sidebar";
import SidebarHeader from "./SidebarHeader";
import SidebarSection from "./SidebarSection";
import QueryBuilderSidebarSection from "./QueryBuilderSidebarSection";

import Action from "../Action";

import FilterWidget
    from "metabase/query_builder/components/filters/FilterWidget";

type Props = {};

const MetricDetailSidebar = (props: Props) => {
    const {
        card,
        tableMetadata,
        metric,
        mode,
        onClose
    } = props;

    return (
        <Sidebar>
            <SidebarSection>
                <SidebarHeader onClose={onClose}>
                    {metric.name}
                </SidebarHeader>
            </SidebarSection>
            <QueryBuilderSidebarSection {...props} />
            {mode.getMetricActions &&
                mode
                    .getMetricActions()
                    .map(getAction => getAction({ card, tableMetadata }))
                    .filter(action => action)
                    .map(action => (
                        <Action
                            action={action}
                            card={card}
                            tableMetadata={tableMetadata}
                        />
                    ))}
        </Sidebar>
    );
};

export default MetricDetailSidebar;
