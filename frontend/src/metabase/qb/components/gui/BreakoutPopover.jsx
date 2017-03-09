/* @flow */

import React, { Component, PropTypes } from "react";

import FieldList from "metabase/query_builder/components/FieldList.jsx";

type Props = {};

const BreakoutPopover = (
    {
        field,
        tableMetadata,
        fieldOptions,
        customFieldOptions,
        onCommitBreakout,
        onClose
    }: Props
) => (
    <FieldList
        className="text-green"
        tableMetadata={tableMetadata}
        field={field}
        fieldOptions={fieldOptions}
        customFieldOptions={customFieldOptions}
        onFieldChange={field => {
            onCommitBreakout(field);
            onClose();
        }}
        enableTimeGrouping
    />
);

export default BreakoutPopover;
