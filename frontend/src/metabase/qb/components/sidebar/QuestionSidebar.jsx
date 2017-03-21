/* @flow weak */

import React, { Component, PropTypes } from "react";

import Sidebar from "./Sidebar";
import SidebarHeader from "./SidebarHeader";
import SidebarSection from "./SidebarSection";
import QueryBuilderSidebarSection from "./QueryBuilderSidebarSection";
import AddMetricAndCustomizeSection from "./AddMetricAndCustomizeSection";

import { getMetricActions } from "./MetricActions";

import Action from "../Action";

import { getMetrics } from "metabase/qb/lib/modes";

const QuestionSidebar = props => {
    const {
        card,
        originalCard,
        tableMetadata,
        onShowMetric,
        onShowQuestionDetails,
        onShowCustomize,
        setCardAndRun,
        mode,
        ...rest
    } = props;
    const metrics = getMetrics(card, tableMetadata);

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
            {metrics.length !== 1
                ? metrics.map((metric, metricIndex) => (
                      <SidebarSection
                          className="h3 text-bold text-grey-4 cursor-pointer"
                          onClick={() => onShowMetric(metricIndex)}
                      >
                          {metric.name}
                      </SidebarSection>
                  ))
                : [
                      (
                          <QueryBuilderSidebarSection
                              {...props}
                              features={{ filter: true, breakout: true }}
                          />
                      )
                  ].concat(getMetricActions(props))}
            {mode.getMainSections
                ? mode.getMainSections().map(Section => <Section {...props} />)
                : <AddMetricAndCustomizeSection
                      {...props}
                      onCustomize={onShowCustomize}
                  />}
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
                              onChangeCardAndRun={setCardAndRun}
                          />
                      ))
                : null}
        </Sidebar>
    );
};

export default QuestionSidebar;
