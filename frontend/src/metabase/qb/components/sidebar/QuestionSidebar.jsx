/* @flow */

import React, { Component, PropTypes } from "react";

import Sidebar from "./Sidebar";
import SidebarHeader from "./SidebarHeader";
import SidebarSection from "./SidebarSection";

import Action from "../Action";

import { getMetrics } from "metabase/qb/lib/modes";

type Props = {};

const QuestionSidebar = props => {
    const {
        card,
        originalCard,
        tableMetadata,
        onShowMetric,
        onShowQuestionDetails,
        setCardAndRun,
        mode,
        ...rest
    } = props;
    return (
        <Sidebar {...rest}>
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
                                <span className="link">
                                    {originalCard.name}
                                </span>
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
            {mode.getMainSections
                ? mode.getMainSections().map(Section => <Section {...props} />)
                : <SidebarSection className="flex h5 text-bold text-grey-4">
                      <div className="text-brand cursor-pointer">
                          Add a metric
                      </div>
                      <div className="ml-auto cursor-pointer">Customize</div>
                  </SidebarSection>}
            {mode.getMainActions
                ? mode
                      .getMainActions()
                      .map(getAction => getAction({ card, tableMetadata }))
                      .filter(action => action)
                      .map(action => (
                          <Action
                              action={action}
                              card={card}
                              tableMetadata={tableMetadata}
                              onAction={setCardAndRun}
                          />
                      ))
                : null}
        </Sidebar>
    );
};

export default QuestionSidebar;
