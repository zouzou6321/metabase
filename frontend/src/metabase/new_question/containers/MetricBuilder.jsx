import cxs from "cxs";
import React, { Component } from "react";
import { connect } from "react-redux";

import Card from "../components/Card";

import { setTip, selectAndAdvance } from "../actions";

import { setQueryDatabase } from "metabase/query_builder/actions";

const mapStateToProps = state => ({
    databases: state.metadata.databases, // TODO use a selector here
    title: state.newQuestion.currentStep.title,
    tip: state.newQuestion.currentStep.tip
});

const mapDispatchToProps = {
    setTip,
    selectAndAdvance,
    setQueryDatabase
};

@connect(mapStateToProps, mapDispatchToProps)
class MetricBuilder extends Component {
    constructor(props) {
        super(props);
        // keep a reference to the tip so that we don't lose it when showing
        // context specific tips
        this.tip = props.tip;
    }
    render() {
        const {
            databases,
            setTip,
            selectAndAdvance,
            setQueryDatabase,
            title
        } = this.props;
        return (
            <div>
                <h2>{title}</h2>
                <ol className={cxs({ display: "flex" })}>
                    {Object.keys(databases).map(dbKey => (
                        <li
                            className={cxs({ flex: "0 0 33.33%" })}
                            key={dbKey}
                            onMouseEnter={() => setTip({
                                title: databases[dbKey].name,
                                text: databases[dbKey].description
                            })}
                            onMouseLeave={() => setTip(this.tip)}
                            onClick={() => selectAndAdvance(() => {
                                setQueryDatabase(databases[dbKey].id);
                            })}
                        >
                            <Card name={databases[dbKey].name} />
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}

export default MetricBuilder;
