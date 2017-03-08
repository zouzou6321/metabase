/* @flow */

import React, { Component, PropTypes } from "react";

import { connect } from "react-redux";

// import { Link } from "react-router";
// import { serializeCardForUrl } from "metabase/lib/card";

import * as actions from "metabase/query_builder/actions";

const mapDispatchToProps = {
    setCardAndRun: (card) => actions.setCardAndRun(card)
}

type Props = {
};

@connect(null, mapDispatchToProps)
export default class QueryButton extends Component<*, Props, *> {
    render() {
        return React.cloneElement(React.Children.only(this.props.children), {
            onClick: () => {
                this.props.setCardAndRun(this.props.card);
            }
        });
        // return (
        //     <Link to={"/q#" + serializeCardForUrl(card)} className="no-decoration">
        //         {this.props.children}
        //     </Link>
        // )
    }
}
