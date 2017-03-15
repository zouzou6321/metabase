/* @flow */

import React from "react";

import BreakoutPopover from "metabase/qb/components/gui/BreakoutPopover";

import Query from "metabase/lib/query";
import { pivot } from "metabase/qb/lib/actions";

export default (name, icon, fieldFilter) => (
    { card, tableMetadata, clicked }
) => {
    const breakouts = Query.getBreakouts(card.dataset_query.query);
    const usedFields = {};
    for (const breakout of breakouts) {
        usedFields[breakout] = true;
    }

    const fieldOptions = Query.getFieldOptions(
        tableMetadata.fields,
        true,
        fields => {
            fields = tableMetadata.breakout_options.validFieldsFilter(fields);
            if (fieldFilter) {
                fields = fields.filter(fieldFilter);
            }
            return fields;
        },
        usedFields
    );

    if (fieldOptions.length === 0) {
        return null;
    }

    return {
        title: clicked
            ? <span>
                  View this
                  {" "}
                  <span className="text-dark">
                      {clicked.dimensionColumn.unit ||
                          clicked.dimensionColumn.display_name}
                  </span>
                  {" "}
                  by
                  {" "}
                  <span className="text-dark">{name.toLowerCase()}</span>
              </span>
            : <span>Pivot by <span className="text-dark">{name}</span></span>,
        icon: icon,
        popover: ({ onAction, onClose }) => (
            <BreakoutPopover
                tableMetadata={tableMetadata}
                fieldOptions={fieldOptions}
                customFieldOptions={Query.getExpressions(
                    card.dataset_query.query
                )}
                onCommitBreakout={breakout => {
                    onAction(pivot(card, breakout, tableMetadata, clicked));
                    onClose && onClose();
                }}
            />
        )
    };
};
