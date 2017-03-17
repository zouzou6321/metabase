import React from "react";

import SidebarSection from "./SidebarSection";
import PopoverWithTrigger from "metabase/components/PopoverWithTrigger";
import AggregationPopover from "metabase/qb/components/gui/AggregationPopover";

const AddMetricAndCustomizeSection = (
    { tableMetadata, card, addQueryAggregation, runQueryFn, onCustomize }
) => (
    <SidebarSection className="flex h5 text-bold text-grey-4">
        <PopoverWithTrigger
            triggerElement="Add a metric"
            triggerClasses="text-brand cursor-pointer"
        >
            <AggregationPopover
                tableMetadata={tableMetadata}
                datasetQuery={card.dataset_query}
                onCommitAggregation={aggregation => {
                    addQueryAggregation(aggregation);
                    runQueryFn();
                }}
            />
        </PopoverWithTrigger>
        <div className="ml-auto cursor-pointer" onClick={onCustomize}>
            Customize
        </div>
    </SidebarSection>
);

export default AddMetricAndCustomizeSection;
