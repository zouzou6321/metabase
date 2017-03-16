/* @flow weak */

import React, { Component, PropTypes } from "react";

import DataSection from "./DataSection";
import FilterSection from "./FilterSection";
import BreakoutSection from "./BreakoutSection";
import AggregationSection from "./AggregationSection";
import OrderBySection from "./OrderBySection";

import ExtendedOptions
    from "metabase/query_builder/components/ExtendedOptions.jsx";

import cx from "classnames";
import _ from "underscore";

export default class GuiQueryEditor extends Component {
    static propTypes = {
        databases: PropTypes.array,
        query: PropTypes.object.isRequired,
        tableMetadata: PropTypes.object, // can't be required, sometimes null
        isShowingDataReference: PropTypes.bool.isRequired,
        setQueryFn: PropTypes.func.isRequired,
        setDatabaseFn: PropTypes.func,
        setSourceTableFn: PropTypes.func,
        features: PropTypes.object
    };

    static defaultProps = {
        features: {
            data: true,
            filter: true,
            aggregation: true,
            breakout: true,
            sort: true,
            limit: true
        }
    };

    renderExtendedSection() {
        return (
            <ExtendedOptions
                {...this.props}
                setQuery={query => this.props.setQuery(query)}
            />
        );
    }

    render() {
        const { query, databases, features } = this.props;
        const readOnly = query.database != null &&
            !_.findWhere(databases, { id: query.database });

        if (readOnly) {
            return <div />;
        }

        return (
            <div className={cx("p2", { disabled: readOnly })}>
                {features.data && <DataSection {...this.props} />}
                {features.filter && <FilterSection {...this.props} />}
                {features.aggregation && <AggregationSection {...this.props} />}
                {features.breakout && <BreakoutSection {...this.props} />}
                {features.sort && <OrderBySection {...this.props} />}
                {this.renderExtendedSection()}
                {this.props.children}
            </div>
        );
    }
}
