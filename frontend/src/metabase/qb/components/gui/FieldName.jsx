import React, { Component, PropTypes } from "react";

import Icon from "metabase/components/Icon.jsx";

import Query from "metabase/lib/query";
import { formatBucketing } from "metabase/lib/query_time";
import { stripId } from "metabase/lib/formatting";

import * as Field from "metabase/lib/query/field";
import { getAggregations } from "metabase/lib/query/query";

import AggregationName from "./AggregationName";

import cx from "classnames";

export default class FieldName extends Component {
    static propTypes = {
        field: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
        onClick: PropTypes.func,
        removeField: PropTypes.func,
        tableMetadata: PropTypes.object.isRequired,
        datasetQuery: PropTypes.object
    };

    render() {
        let { field, tableMetadata, datasetQuery, className } = this.props;
        let parts = [];

        if (Field.isExpressionField(field)) {
            parts.push(field[1]);
        } else if (datasetQuery && Field.isAggregateField(field)) {
            const aggregationIndex = field[1];
            const aggregation = getAggregations(datasetQuery.query)[
                aggregationIndex
            ];
            parts.push(
                <AggregationName
                    aggregation={aggregation}
                    tableMetadata={tableMetadata}
                    customFieldOptions={datasetQuery.query.expressions}
                />
            );
        } else {
            let fieldTarget = Query.getFieldTarget(field, tableMetadata);

            if (fieldTarget && !fieldTarget.field) {
                parts.push(
                    <span className="text-error" key="field">
                        Missing Field
                    </span>
                );
            } else if (fieldTarget) {
                // fk path
                for (let [index, fkField] of Object.entries(fieldTarget.path)) {
                    parts.push(
                        <span key={"fkName" + index}>
                            {stripId(fkField.display_name)}
                        </span>
                    );
                    parts.push(
                        <span key={"fkIcon" + index} className="px1">
                            <Icon name="connections" size={10} />
                        </span>
                    );
                }
                if (fieldTarget.field.id != null) {
                    parts.push(
                        <span key="field">
                            {Query.getFieldPathName(
                                fieldTarget.field.id,
                                fieldTarget.table
                            )}
                        </span>
                    );
                } else {
                    // expressions, etc
                    parts.push(
                        <span key="field">
                            {fieldTarget.field.display_name}
                        </span>
                    );
                }
                // datetime-field unit
                if (fieldTarget.unit != null) {
                    parts.push(
                        <span key="unit">
                            {": " + formatBucketing(fieldTarget.unit)}
                        </span>
                    );
                }
            } else {
                parts.push(<span key="field">field</span>);
            }
        }

        return (
            <span
                className={cx(className, {
                    selected: Query.isValidField(field)
                })}
                onClick={this.props.onClick}
            >
                {parts}
            </span>
        );
    }
}
