/* @flow weak */

import React, { Component, PropTypes } from "react";

import QuerySidebar from "./sidebar/QuerySidebar";

import QueryParameters from "./QueryParameters";
import QueryResult from "./QueryResult";

import { getMode } from "metabase/qb/lib/modes";

export default class QueryBuilder extends Component {
    render() {
        const {
            card,
            databases,
            tableMetadata,
            parameters
        } = this.props;

        if (!card || !databases) {
            return <div />;
        }

        const mode = getMode(card, tableMetadata);
        const { ModeLayout, ModeFooter } = mode;

        if (ModeLayout) {
            return (
                <ModeLayout {...this.props} className="flex-full" mode={mode} />
            );
        }

        return (
            <div className="flex-full flex flex-row relative">
                <QuerySidebar {...this.props} mode={mode} />
                <div className="flex-full flex flex-column">
                    {parameters.length > 0 &&
                        <div className="flex layout-centered">
                            <QueryParameters {...this.props} mode={mode} />
                        </div>}
                    <QueryResult {...this.props} mode={mode} />
                    {ModeFooter && <ModeFooter {...this.props} />}
                </div>
                <div className="absolute bottom right z4">{mode.name}</div>
            </div>
        );
    }
}
