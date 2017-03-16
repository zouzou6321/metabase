/* @flow weak */

import React, { Component, PropTypes } from "react";

import DataSection from "./DataSection";
import FilterSection from "./FilterSection";
import BreakoutSection from "./BreakoutSection";
import AggregationSection from "./AggregationSection";
import OrderBySection from "./OrderBySection";
import ExpressionSection from "./ExpressionSection";
import LimitSection from "./LimitSection";

import RunButton from "metabase/query_builder/components/RunButton";

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
            order_by: true,
            limit: true,
            expressions: true
        }
    };

    render() {
        const { query, databases, features } = this.props;
        const readOnly = query.database != null &&
            !_.findWhere(databases, { id: query.database });

        if (readOnly) {
            return <div />;
        }

        const { isRunning, isRunnable, runQueryFn, cancelQueryFn } = this.props;
        const isDirty = true; // FIXME

        return (
            <div className={cx("p2", { disabled: readOnly })}>
                {features.data && <DataSection {...this.props} />}
                {features.filter && <FilterSection {...this.props} />}
                {features.aggregation && <AggregationSection {...this.props} />}
                {features.breakout && <BreakoutSection {...this.props} />}
                {features.order_by && <OrderBySection {...this.props} />}
                {features.expressions && <ExpressionSection {...this.props} />}
                {features.limit && <LimitSection {...this.props} />}
                {this.props.children}
                <RunButton
                    isRunnable={isRunnable}
                    isDirty={isDirty}
                    isRunning={isRunning}
                    onRun={runQueryFn}
                    onCancel={cancelQueryFn}
                />
            </div>
        );
    }
}
