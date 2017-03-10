import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";

import FilterName from "./FilterName";
import FilterPopover from "./FilterPopover.jsx";
import BreakoutName from "./BreakoutName";
import BreakoutPopover from "./BreakoutPopover";
import AggregationName from "./AggregationName";
import AggregationPopover from "./AggregationPopover";

import GuiSection from "./GuiSection";
import GuiClauseEditor from "./GuiClauseEditor";

import DataSelector from "metabase/query_builder/components/DataSelector.jsx";
import ExtendedOptions
    from "metabase/query_builder/components/ExtendedOptions.jsx";

import Query from "metabase/lib/query";

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
                {this.renderExtendedSection()}
                {this.props.children}
            </div>
        );
    }
}

const DataSection = (
    {
        query,
        databases,
        tables,
        setDatabaseFn,
        setSourceTableFn,
        isShowingTutorial
    }
) => (
    <GuiSection title="Data">
        <DataSelector
            ref="dataSection"
            className="text-bold"
            includeTables={true}
            query={query}
            databases={databases}
            tables={tables}
            setDatabaseFn={setDatabaseFn}
            setSourceTableFn={setSourceTableFn}
            isInitiallyOpen={
                (!query.database || !query.query.source_table) &&
                    !isShowingTutorial
            }
        />
    </GuiSection>
);

const FilterSection = (
    { query, tableMetadata, addQueryFilter, setQueryFilter, removeQueryFilter }
) => (
    <GuiSection title="Filters" titleClass="text-purple">
        <GuiClauseEditor
            items={Query.getFilters(query.query)}
            canAdd={Query.canAddFilter(query.query)}
            onRemove={({ item, index }) => removeQueryFilter(index)}
            renderItem={({ item, index, ...props }) => (
                <FilterName
                    {...props}
                    filter={item}
                    tableMetadata={tableMetadata}
                />
            )}
            renderEdit={({ item, index, ...props }) => (
                <FilterPopover
                    {...props}
                    filter={item}
                    tableMetadata={tableMetadata}
                    customFields={Query.getExpressions(query.query)}
                    onCommitFilter={filter => setQueryFilter(index, filter)}
                />
            )}
        />
    </GuiSection>
);

const BreakoutSection = (
    { query, tableMetadata, setQueryBreakout, removeQueryBreakout }
) => {
    if (!tableMetadata || !tableMetadata.breakout_options.fields.length === 0) {
        return null;
    }
    const breakouts = Query.getBreakouts(query.query);
    const usedFields = {};
    for (const breakout of breakouts) {
        usedFields[breakout] = true;
    }
    const remainingFieldOptions = Query.getFieldOptions(
        tableMetadata.fields,
        true,
        tableMetadata.breakout_options.validFieldsFilter,
        usedFields
    );
    return (
        <GuiSection title="Breakouts" titleClass="text-brand">
            <GuiClauseEditor
                items={breakouts}
                canAdd={remainingFieldOptions.count > 0}
                renderItem={({ item, index, ...props }) => (
                    <BreakoutName
                        {...props}
                        className="text-bold"
                        breakout={item}
                        tableMetadata={tableMetadata}
                        customFields={Query.getExpressions(query.query)}
                    />
                )}
                renderEdit={({ item, index, ...props }) => (
                    <BreakoutPopover
                        {...props}
                        breakout={item}
                        tableMetadata={tableMetadata}
                        fieldOptions={Query.getFieldOptions(
                            tableMetadata.fields,
                            true,
                            tableMetadata.breakout_options.validFieldsFilter,
                            _.omit(usedFields, item)
                        )}
                        customFieldOptions={Query.getExpressions(query)}
                        onCommitBreakout={breakout =>
                            setQueryBreakout(index, breakout)}
                    />
                )}
                onRemove={({ item, index }) => setQueryBreakout(index, null)}
            />
        </GuiSection>
    );
};

const AggregationSection = (
    { query, tableMetadata, setQueryAggregation, removeQueryAggregation }
) => {
    let aggregations = Query.getAggregations(query.query);
    return (
        <GuiSection title="Aggregations" titleClass="text-green">
            <GuiClauseEditor
                items={aggregations}
                canAdd
                renderItem={({ item, index, ...props }) => (
                    <AggregationName
                        {...props}
                        aggregation={item}
                        tableMetadata={tableMetadata}
                        customFields={Query.getExpressions(query.query)}
                    />
                )}
                renderEdit={({ item, index, ...props }) => (
                    <AggregationPopover
                        {...props}
                        aggregation={item}
                        tableMetadata={tableMetadata}
                        customFields={Query.getExpressions(query.query)}
                        availableAggregations={
                            tableMetadata.aggregation_options
                        }
                        onCommitAggregation={aggregation =>
                            setQueryAggregation(index, aggregation)}
                    />
                )}
                onRemove={({ item, index }) => removeQueryAggregation(index)}
            />
        </GuiSection>
    );
};
