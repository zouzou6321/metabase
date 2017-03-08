/* @flow */

import React, { Component, PropTypes } from "react";

import * as Query from "metabase/lib/query/query";
import * as Card from "metabase/meta/Card";

import Sidebar from "./Sidebar";
import SidebarHeader from "./SidebarHeader";
import SidebarSection from "./SidebarSection";

import Action from "../Action";

import FilterWidget
    from "metabase/query_builder/components/filters/FilterWidget";

type Props = {};

const MetricDetailSidebar = (
    {
        card,
        tableMetadata,
        metric,
        mode,
        setQueryFilter,
        removeQueryFilter,
        onClose
    }: Props
) => {
    const query = Card.getQuery(card);
    const filters = Query.getFilters(query);
    const breakouts = Query.getBreakouts(query);

    return (
        <Sidebar>
            <SidebarSection>
                <SidebarHeader onClose={onClose}>
                    {metric.name}
                </SidebarHeader>
            </SidebarSection>
            <SidebarSection>
                <div className="h5 text-bold text-uppercase text-purple">
                    Filters
                </div>
                {filters.map((filter, index) => (
                    <div className="flex align-center">
                        <FilterWidget
                            filter={filter}
                            tableMetadata={tableMetadata}
                            index={index}
                            updateFilter={setQueryFilter}
                            removeFilter={removeQueryFilter}
                        />
                        {/* <div>
                            <span className="text-bold">Created At</span> is before <span className="text-bold">January 22, 2017</span>
                        </div>
                        <div className="ml-auto flex-no-shrink flex align-center my1">
                             <span className="h5 text-bold text-grey-4 mx1">Change</span>
                            <Icon name="close" className="text-grey-2 text-grey-4-hover cursor-pointer" />
                        </div> */}
                    </div>
                ))}
                <div
                    className="h5 text-bold text-grey-4 mt1 mb2 cursor-pointer"
                >
                    Add a filter
                </div>

                <div className="h5 text-bold text-uppercase text-green">
                    Breakouts
                </div>
                {breakouts.map(breakout => (
                    <div>{JSON.stringify(breakout)}</div>
                ))}
                <div className="h5 text-bold text-grey-4">Add a breakout</div>
            </SidebarSection>
            {mode.getSidebarActions &&
                mode
                    .getSidebarActions()
                    .map(getAction => getAction({ card, tableMetadata }))
                    .filter(action => console.log(action) || action)
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
