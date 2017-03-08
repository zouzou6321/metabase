/* @flow */

import React, { Component, PropTypes } from "react";

import CollectionBadge from "metabase/components/CollectionBadge";

import Sidebar from "./Sidebar";
import SidebarHeader from "./SidebarHeader";
import SidebarSubAction from "./SidebarSubAction";
import SidebarSection from "./SidebarSection";

type Props = {
};

const QuestionDetailSidebar = ({ card, onClose }: Props) =>
    <Sidebar>
        <SidebarSection>
            <SidebarHeader onClose={onClose}>
                {card.name}
            </SidebarHeader>
            { card.collection &&
                <div className="mt2">
                    <CollectionBadge collection={card.collection} />
                </div>
            }
            { card.description &&
                <div className="mt2 text-grey-4">{card.description}</div>
            }
        </SidebarSection>
        <SidebarSection>
            <SidebarSubAction icon="pencil" className="mb1">Edit name and description</SidebarSubAction>
            <SidebarSubAction icon="history">View the revision history</SidebarSubAction>
        </SidebarSection>
    </Sidebar>;

export default QuestionDetailSidebar;
