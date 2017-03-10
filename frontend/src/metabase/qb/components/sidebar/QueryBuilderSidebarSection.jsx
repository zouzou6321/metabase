/* @flow */

import React, { Component, PropTypes } from "react";

import GuiQueryEditor from "metabase/qb/components/gui/GuiQueryEditor";

type Props = {};

type State = {};

export default class QueryBuilderSidebarSection
    extends Component<*, Props, State> {
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    static defaultProps = {};

    render() {
        return <GuiQueryEditor {...this.props} />;
    }
}
