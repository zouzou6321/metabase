/* @flow weak */

import React from "react";

import Parameters from "metabase/dashboard/containers/Parameters";

const QueryParameters = (
    { parameters, location, setParameterValue, runQueryFn }
) => (
    <Parameters
        parameters={parameters}
        query={location.query}
        setParameterValue={(id, value) => {
            setParameterValue(id, value);
            runQueryFn();
        }}
        isQB
    />
);

export default QueryParameters;
