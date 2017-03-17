/* @flow weak */

import React, { Component, PropTypes } from "react";

import Sidebar from "./Sidebar";

import MetricDetailSidebar from "./MetricDetailSidebar";
import QuestionDetailSidebar from "./QuestionDetailSidebar";
import CustomizeSidebar from "./CustomizeSidebar";
import QuestionSidebar from "./QuestionSidebar";

import { getMetrics } from "metabase/qb/lib/modes";

import cx from "classnames";

type Props = {};

type State = {};

export default class QuerySidebar extends Component<*, Props, State> {
    state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            showQuestionDetails: false,
            showMetric: null,
            showCustomize: false
        };
    }

    static defaultProps = {};

    render() {
        const { className, card, tableMetadata, mode } = this.props;
        const { showQuestionDetails, showMetric, showCustomize } = this.state;

        const { ModeSidebarFooter } = mode;
        const metric = showMetric != null
            ? getMetrics(card, tableMetadata)[showMetric]
            : null;

        return (
            <div className={cx(className, "flex flex-column p2")}>
                {showCustomize
                    ? <CustomizeSidebar
                          {...this.props}
                          onClose={() =>
                              this.setState({ showCustomize: false })}
                      />
                    : showQuestionDetails
                          ? <QuestionDetailSidebar
                                {...this.props}
                                className="scroll-y"
                                onClose={() =>
                                    this.setState({
                                        showQuestionDetails: false
                                    })}
                            />
                          : metric != null
                                ? <MetricDetailSidebar
                                      {...this.props}
                                      className="scroll-y"
                                      metric={metric}
                                      onClose={() =>
                                          this.setState({ showMetric: null })}
                                  />
                                : <QuestionSidebar
                                      {...this.props}
                                      className="scroll-y"
                                      onShowQuestionDetails={() =>
                                          this.setState({
                                              showQuestionDetails: true
                                          })}
                                      onShowMetric={metricIndex =>
                                          this.setState({
                                              showMetric: metricIndex
                                          })}
                                      onShowCustomize={() =>
                                          this.setState({
                                              showCustomize: true
                                          })}
                                  />}

                <div className="flex-full my1" />

                {ModeSidebarFooter &&
                    <Sidebar>
                        <ModeSidebarFooter {...this.props} />
                    </Sidebar>}
            </div>
        );
    }
}
