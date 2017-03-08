import cxs from 'cxs';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from '../components/Card';

import {
    isDate,
    isNumber,
    isCategory,
} from 'metabase/lib/schema_metadata';

import {
    selectAndAdvance,
    selectMetricBreakout,
    setTip
} from '../actions';

const mapStateToProps = (state) => {
    const rawFields = state.metadata.tables[state.newQuestion.card.dataset_query.query.source_table].fields_lookup
    const fields = Object.keys(rawFields).map(field => rawFields[field])
    return {
        title: state.newQuestion.currentStep.title,
        breakouts: {
            'date':     fields.filter(f => isDate(f)),
            'number':   fields.filter(f => isNumber(f)),
            'category':   fields.filter(f => isCategory(f)),
        },
        tip: state.newQuestion.currentStep.tip
    }
}

const mapDispatchToProps = ({
    selectAndAdvance,
    selectMetricBreakout,
    setTip
})


@connect(mapStateToProps, mapDispatchToProps)
class BreakoutSelection extends Component {
    constructor(props) {
        super(props)
        this.tip = props.tip
    }
    render () {
        const { title, breakouts, selectAndAdvance, setTip } = this.props;
        return (
            <div>
                <h3>{ title }</h3>
                <ol>
                    { Object.keys(breakouts).map(breakout =>
                        <li
                            key={breakouts[breakout]}
                        >
                            <h3>{breakout}</h3>
                            <ol className={cxs({ display: 'flex', flexWrap: 'wrap' })}>
                                { breakouts[breakout].map(f =>
                                    <li
                                        onClick={() =>
                                            selectAndAdvance(() =>
                                                selectMetricBreakout(f)
                                            )
                                        }
                                        onMouseEnter={() => {
                                            if(f.description) {
                                                setTip({
                                                    title: f.display_name,
                                                    text: f.description
                                                })
                                            }
                                            return false
                                        }}
                                        onMouseLeave={() => setTip(this.tip)}
                                        className={cxs({ flex: '0 0 33.33%', padding: '1em' })}
                                        key={f.id}
                                    >
                                        <Card name={ f.display_name } />
                                    </li>
                                )}
                            </ol>
                        </li>
                    )}
                </ol>
            </div>
        )
    }
}

export default BreakoutSelection;
