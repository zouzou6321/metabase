/* @flow weak */

import React from "react";

import QueryVisualization
    from "metabase/query_builder/components/QueryVisualization";

const QueryResult = props => (
    <QueryVisualization
        {...props}
        noHeader
        className="flex-full"
        mode={props.mode}
        onDrillThrough={props.setCardAndRun}
    />
);

export default QueryResult;
