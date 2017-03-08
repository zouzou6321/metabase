/* @flow */

import React, { Component, PropTypes } from "react";

import Sidebar from "./Sidebar";
import SidebarHeader from "./SidebarHeader";
import SidebarSection from "./SidebarSection";

import { getMetrics } from "metabase/qb/lib/modes";

type Props = {};

const QuestionSidebar = (
    {
        card,
        originalCard,
        tableMetadata,
        onShowMetric,
        onShowQuestionDetails
    }: Props
) => (
    <Sidebar>
        {card.id != null
            ? <SidebarSection>
                  <SidebarHeader onOpen={onShowQuestionDetails}>
                      {card.name}
                  </SidebarHeader>
              </SidebarSection>
            : card.id == null && originalCard
                  ? <SidebarSection>
                        <span>
                            started from
                            {" "}
                            <span className="link">{originalCard.name}</span>
                        </span>
                    </SidebarSection>
                  : null}
        {getMetrics(card, tableMetadata).map((metric, metricIndex) => (
            <SidebarSection
                className="h3 text-bold text-grey-4 cursor-pointer"
                onClick={() => onShowMetric(metricIndex)}
            >
                {metric.name}
            </SidebarSection>
        ))}
        <SidebarSection className="flex h5 text-bold text-grey-4">
            <div className="text-brand cursor-pointer">Add a metric</div>
            <div className="ml-auto cursor-pointer">Customize</div>
        </SidebarSection>
    </Sidebar>
);

export default QuestionSidebar;
