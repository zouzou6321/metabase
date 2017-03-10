/* @flow */

import React, { Component, PropTypes } from "react";

import QuerySidebar from "./sidebar/QuerySidebar";
import QueryVisualization
    from "metabase/query_builder/components/QueryVisualization";
import Parameters from "metabase/dashboard/containers/Parameters";

import { getMode } from "metabase/qb/lib/modes";

export default class QueryBuilder extends Component {
    render() {
        const {
            card,
            databases,
            tableMetadata,
            runQueryFn,
            setCardAndRun,
            location,
            parameters,
            setParameterValue
        } = this.props;

        if (!card || !databases) {
            return <div />;
        }

        const mode = getMode(card, tableMetadata);
        const { ModeFooter } = mode;

        return (
            <div className="flex-full flex flex-row relative">
                <QuerySidebar {...this.props} mode={mode} />
                <div className="flex-full flex flex-column">
                    {parameters.length > 0 &&
                        <div className="flex layout-centered">
                            <Parameters
                                parameters={parameters}
                                query={location.query}
                                setParameterValue={(id, value) => {
                                    setParameterValue(id, value);
                                    runQueryFn();
                                }}
                                isQB
                            />
                        </div>}
                    <QueryVisualization
                        {...this.props}
                        noHeader
                        className="flex-full"
                        mode={mode}
                        onDrillThrough={setCardAndRun}
                    />
                    {ModeFooter && <ModeFooter {...this.props} />}
                </div>
                <div className="absolute bottom right z4">{mode.name}</div>
            </div>
        );
    }
}
