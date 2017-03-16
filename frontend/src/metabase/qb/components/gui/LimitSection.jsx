/* @flow */

import React from "react";

import GuiSection from "./GuiSection";
import LimitWidget from "metabase/query_builder/components/LimitWidget";

const LimitSection = (
    {
        card,
        updateQueryLimit
    }
) => {
    return (
        <GuiSection title="Row limit">
            <LimitWidget
                limit={card.dataset_query.query.limit}
                onChange={updateQueryLimit}
            />
        </GuiSection>
    );
};

export default LimitSection;
