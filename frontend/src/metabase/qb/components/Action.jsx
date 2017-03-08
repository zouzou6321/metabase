import React from "react";

import SidebarTopAction from "metabase/qb/components/sidebar/SidebarTopAction";
import CardButton from "metabase/qb/containers/CardButton";

import PopoverWithTrigger from "metabase/components/PopoverWithTrigger";

const Action = ({ action, ...props }) => {
    if (action) {
        const trigger = (
            <SidebarTopAction icon={action.icon} {...props}>
                {action.title}
            </SidebarTopAction>
        );

        if (action.card) {
            return <CardButton card={action.card}>{trigger}</CardButton>;
        } else if (action.popover) {
            const PopoverContent = action.popover;
            return (
                <PopoverWithTrigger triggerElement={trigger}>
                    <PopoverContent {...props} />
                </PopoverWithTrigger>
            );
        }
    }
    return null;
};

export default Action;
