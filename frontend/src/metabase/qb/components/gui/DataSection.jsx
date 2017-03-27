/* @flow weak */

import React, { Component, PropTypes } from "react";

import GuiSection from "./GuiSection";
import DataSelector from "metabase/query_builder/components/DataSelector.jsx";

const DataSection = (
    {
        datasetQuery,
        databases,
        tables,
        setDatabaseFn,
        setSourceTableFn,
        isShowingTutorial
    }
) => (
    <GuiSection title="Data">
        <DataSelector
            className="text-bold"
            includeTables={true}
            datasetQuery={datasetQuery}
            databases={databases}
            tables={tables}
            setDatabaseFn={setDatabaseFn}
            setSourceTableFn={setSourceTableFn}
            isInitiallyOpen={
                (!datasetQuery.database || !datasetQuery.query.source_table) &&
                    !isShowingTutorial
            }
        />
    </GuiSection>
);

export default DataSection;
