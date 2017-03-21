/* @flow weak */

import React from "react";

import Action from "../Action";

export function getMetricActions({ mode, card, tableMetadata, setCardAndRun }) {
    return mode.getMetricActions &&
        mode
            .getMetricActions()
            .map(getAction => getAction({ card, tableMetadata }))
            .filter(action => action)
            .map(action => (
                <Action
                    action={action}
                    card={card}
                    tableMetadata={tableMetadata}
                    onChangeCardAndRun={setCardAndRun}
                />
            ));
}
