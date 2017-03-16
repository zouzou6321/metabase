/* @flow weak */

import React from "react";

import GuiClauseEditor from "./GuiClauseEditor";
import OrderByName from "./OrderByName";
import OrderByPopover from "./OrderByPopover";

import Query from "metabase/lib/query";

import _ from "underscore";

const OrderBySection = (
    { query, tableMetadata, updateQueryOrderBy, removeQueryOrderBy }
) => {
    const sorts = Query.getOrderBys(query.query);
    const expressions = Query.getExpressions(query.query);

    const usedFields = {};
    const usedExpressions = {};
    for (const sort of sorts) {
        if (Query.isExpressionField(sort[0])) {
            usedExpressions[sort[0][1]] = true;
        } else {
            usedFields[sort[0]] = true;
        }
    }

    const remainingFieldOptions = Query.getFieldOptions(
        tableMetadata.fields,
        true,
        Query.getSortableFields.bind(null, query.query),
        usedFields
    );
    const remainingExpressions = Object.keys(
        _.omit(expressions, usedExpressions)
    );

    let canAdd = false;
    if (
        (remainingFieldOptions.count > 0 || remainingExpressions.length > 1) &&
        (sorts.length === 0 || sorts[sorts.length - 1][0] != null)
    ) {
        canAdd = true;
    }

    console.log("remainingFieldOptions", remainingFieldOptions);

    return (
        <GuiClauseEditor
            title="Sort"
            items={sorts}
            canAdd={canAdd}
            renderItem={({ item, index, ...props }) => (
                <OrderByName
                    {...props}
                    className="text-bold"
                    orderBy={item}
                    tableMetadata={tableMetadata}
                    datasetQuery={query}
                />
            )}
            renderEdit={({ item, index, ...props }) => (
                <OrderByPopover
                    {...props}
                    orderBy={item}
                    tableMetadata={tableMetadata}
                    fieldOptions={Query.getFieldOptions(
                        tableMetadata.fields,
                        true,
                        Query.getSortableFields.bind(null, query.query)
                    )}
                    customFieldOptions={expressions}
                    onCommitOrderBy={orderBy =>
                        updateQueryOrderBy(index, orderBy)}
                />
            )}
            onRemove={({ item, index }) => removeQueryOrderBy(index)}
        />
    );
};

export default OrderBySection;
