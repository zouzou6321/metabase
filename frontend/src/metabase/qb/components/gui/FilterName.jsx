/* @flow weak */

import React, { Component, PropTypes } from "react";

import FieldName from "./FieldName.jsx";

import Query from "metabase/lib/query";
import { generateTimeFilterValuesDescriptions } from "metabase/lib/query_time";
import { isDate } from "metabase/lib/schema_metadata";

import _ from "underscore";

import type { FieldFilter } from "metabase/meta/types/Query";
import type { TableMetadata } from "metabase/meta/types/Metadata";

type Props = {
    filter: FieldFilter,
    tableMetadata: TableMetadata,
    maxDisplayValues?: number
};

const SegmentFilterName = ({ filter, tableMetadata, ...rest }) => {
    const segment = _.find(tableMetadata.segments, s => s.id === filter[1]);
    return (
        <span {...rest}>
            <span>Matches</span>
            <span>{segment && segment.name}</span>
        </span>
    );
};

const OperatorFilterName = (
    { filter, tableMetadata, maxDisplayValues = 1, ...rest }
) => {
    let [operator, field, ...values] = filter;

    let target = Query.getFieldTarget(field, tableMetadata);
    let fieldDef = target && target.field;
    let operatorDef = fieldDef && fieldDef.operators_lookup[operator];

    // $FlowFixMe: not understanding maxDisplayValues is provided by defaultProps
    if (operatorDef && operatorDef.multi && values.length > maxDisplayValues) {
        values = [values.length + " selections"];
    }

    if (isDate(fieldDef)) {
        values = generateTimeFilterValuesDescriptions(filter);
    }

    return (
        <span {...rest}>
            <span>
                <FieldName
                    className="text-bold"
                    tableMetadata={tableMetadata}
                    field={field}
                    fieldOptions={Query.getFieldOptions(
                        tableMetadata.fields,
                        true
                    )}
                />
                <span>
                    &nbsp;
                    <span>{operatorDef && operatorDef.moreVerboseName}</span>
                    &nbsp;
                </span>
            </span>
            {values.length > 0 &&
                <span className="text-bold">
                    {values.map((value, valueIndex) => {
                        const valueString = value != null
                            ? value.toString()
                            : null;
                        return value != undefined && <span>{valueString}</span>;
                    })}
                </span>}
        </span>
    );
};

const FilterName = ({ filter, ...props }: Props) =>
    filter[0] === "SEGMENT"
        ? <SegmentFilterName filter={filter} {...props} />
        : <OperatorFilterName filter={filter} {...props} />;

export default FilterName;
