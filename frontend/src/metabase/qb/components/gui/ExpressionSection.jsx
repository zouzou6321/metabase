/* @flow weak */

import React, { Component, PropTypes } from "react";

import GuiClauseEditor from "./GuiClauseEditor";

import Query from "metabase/lib/query";

import ExpressionPopover from "./ExpressionPopover";

const ExpressionSection = (
    {
        datasetQuery,
        tableMetadata,
        updateQueryExpression,
        removeQueryExpression
    }
) => {
    const expressions = Query.getExpressionsList(datasetQuery.query);
    return (
        <GuiClauseEditor
            title="Custom Fields"
            items={expressions}
            canAdd={Query.canAddFilter(datasetQuery.query)}
            onRemove={({ item, index }) => removeQueryExpression(item.name)}
            renderItem={({ item, index, ...props }) => (
                <div className="text-bold">{item.name}</div>
            )}
            renderEdit={({ item, index, ...props }) => (
                <ExpressionPopover
                    name={item ? item.name : ""}
                    expression={item && item.expression}
                    tableMetadata={tableMetadata}
                    onCommitExpression={updateQueryExpression}
                    onRemoveExpression={removeQueryExpression}
                />
            )}
        />
    );
};

export default ExpressionSection;
