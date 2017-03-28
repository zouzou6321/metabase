/* @flow weak */

import React, { Component, PropTypes } from "react";

import GuiClauseEditor from "./GuiClauseEditor";
import FilterName from "./FilterName";
import FilterPopover from "./FilterPopover.jsx";

import Query from "metabase/lib/query";

const FilterSection = (
    { datasetQuery, tableMetadata, updateQueryFilter, removeQueryFilter }
) => (
    <GuiClauseEditor
        title="Filters"
        titleClass="text-purple"
        items={Query.getFilters(datasetQuery.query)}
        canAdd={Query.canAddFilter(datasetQuery.query)}
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
                customFields={Query.getExpressions(datasetQuery.query)}
                onCommitFilter={filter => updateQueryFilter(index, filter)}
            />
        )}
    />
);

export default FilterSection;
