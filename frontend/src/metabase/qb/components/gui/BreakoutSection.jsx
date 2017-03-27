/* @flow weak */

import React, { Component, PropTypes } from "react";

import GuiClauseEditor from "./GuiClauseEditor";
import BreakoutName from "./BreakoutName";
import BreakoutPopover from "./BreakoutPopover";

import Query from "metabase/lib/query";

import _ from "underscore";

const BreakoutSection = (
    { datasetQuery, tableMetadata, updateQueryBreakout, removeQueryBreakout }
) => {
    if (!tableMetadata || !tableMetadata.breakout_options.fields.length === 0) {
        return null;
    }
    const breakouts = Query.getBreakouts(datasetQuery.query);
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
        <GuiClauseEditor
            title="Dimensions"
            titleClass="text-brand"
            items={breakouts}
            canAdd={remainingFieldOptions.count > 0}
            renderItem={({ item, index, ...props }) => (
                <BreakoutName
                    {...props}
                    className="text-bold"
                    breakout={item}
                    tableMetadata={tableMetadata}
                    customFields={Query.getExpressions(datasetQuery.query)}
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
                    customFieldOptions={Query.getExpressions(
                        datasetQuery.query
                    )}
                    onCommitBreakout={breakout =>
                        updateQueryBreakout(index, breakout)}
                />
            )}
            onRemove={({ item, index }) => removeQueryBreakout(index, null)}
        />
    );
};

export default BreakoutSection;
