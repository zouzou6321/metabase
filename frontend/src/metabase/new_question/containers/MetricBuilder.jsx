import cxs from 'cxs';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { normal } from 'metabase/lib/colors';

import { advanceStep } from '../actions'

const Card = ({ name }) =>
    <div className={cxs({
        borderRadius: 4,
        backgroundColor: normal.blue,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 150
    })}>
        <h3>{name}</h3>
    </div>

const mapStateToProps = (state) => ({
    databases: state.metadata.databases, // TODO use a selector here
    title: state.newQuestion.currentStep.title
})

const mapDispatchToProps = ({
    advanceStep
})

@connect(mapStateToProps, mapDispatchToProps)
class MetricBuilder extends Component {
    render () {
        const { advanceStep, databases, title } = this.props;
        return (
            <div>
                <h2>{title}</h2>
                <ol className={cxs({ display: 'flex' })}>
                    { Object.keys(databases).map(dbKey =>
                        <li
                            className={cxs({ flex: '0 0 33.33%' })}
                            key={dbKey}
                            onClick={() => {
                                advanceStep()
                            }}
                        >
                            <Card name={databases[dbKey].name} />
                        </li>
                    )}
                </ol>
            </div>
        )
    }
}

export default MetricBuilder;
