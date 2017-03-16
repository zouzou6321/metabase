/* @flow weak */

import React, { Component, PropTypes } from "react";

import Sidebar from "./Sidebar";
import SidebarHeader from "./SidebarHeader";
import SidebarSection from "./SidebarSection";
import QueryBuilderSidebarSection from "./QueryBuilderSidebarSection";

import Action from "../Action";

type Props = {};

const MetricDetailSidebar = (props: Props) => {
    const {
        card,
        tableMetadata,
        metric,
        mode,
        onClose,
        setCardAndRun,
        ...rest
    } = props;

    return (
        <Sidebar {...rest}>
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
                            onAction={setCardAndRun}
                        />
                    ))}
        </Sidebar>
    );
};

export default MetricDetailSidebar;
