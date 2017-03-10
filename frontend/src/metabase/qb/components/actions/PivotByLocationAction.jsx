/* @flow */

import React from "react";

export default ({ card, tableMetadata }) => {
    return {
        title: (
            <span>Pivot by <span className="text-dark">Location</span></span>
        ),
        icon: "location",
        popover: PivotByLocationPopover
    };
};

const PivotByLocationPopover = () => <div>hello world</div>;
