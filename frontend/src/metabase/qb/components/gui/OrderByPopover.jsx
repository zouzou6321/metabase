/* @flow weak */

import React, { Component, PropTypes } from "react";

import FieldList from "metabase/query_builder/components/FieldList.jsx";

type Props = {};

const OrderByPopover = (
    {
        orderBy,
        tableMetadata,
        fieldOptions,
        customFieldOptions,
        onCommitOrderBy,
        onClose
    }: Props
) => (
    <FieldList
        className="text-green"
        tableMetadata={tableMetadata}
        field={orderBy && orderBy[0]}
        fieldOptions={fieldOptions}
        customFieldOptions={customFieldOptions}
        onFieldChange={field => {
            onCommitOrderBy([field, "ascending"]);
            onClose();
        }}
    />
);

export default OrderByPopover;
