/* @flow weak */

import React, { Component, PropTypes } from "react";

import GuiClauseEditor from "./GuiClauseEditor";
import BreakoutName from "./BreakoutName";
import BreakoutPopover from "./BreakoutPopover";

import Query from "metabase/lib/query";

import _ from "underscore";

const BreakoutSection = (
    { query, tableMetadata, updateQueryBreakout, removeQueryBreakout }
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
                        updateQueryBreakout(index, breakout)}
                />
            )}
            onRemove={({ item, index }) => removeQueryBreakout(index, null)}
        />
    );
};

export default BreakoutSection;
