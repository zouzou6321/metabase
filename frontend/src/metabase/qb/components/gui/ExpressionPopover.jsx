/* @flow */

import React from "react";

import ExpressionWidget
    from "metabase/query_builder/components/expressions/ExpressionWidget";

const ExpressionPopover = (
    {
        name,
        expression,
        tableMetadata,
        onCommitExpression,
        onRemoveExpression,
        onClose
    }
) => (
    <ExpressionWidget
        name={name}
        expression={expression}
        tableMetadata={tableMetadata}
        onSetExpression={(newName, newExpression) => {
            onCommitExpression(newName, newExpression, name);
            onClose();
        }}
        onRemoveExpression={() => {
            onRemoveExpression(name);
            onClose();
        }}
        onCancel={onClose}
    />
);

export default ExpressionPopover;
