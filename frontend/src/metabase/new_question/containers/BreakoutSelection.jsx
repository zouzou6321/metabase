import cxs from 'cxs';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from '../components/Card';

import {
    selectAndAdvance,
    selectMetricBreakout,
    setTip
} from '../actions';

const mapStateToProps = (state) => ({
    title: state.newQuestion.currentStep.title,
    breakouts: state.metadata.tables[state.newQuestion.card.dataset_query.query.source_table].fields_lookup,
    tip: state.newQuestion.currentStep.tip
})

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
                <ol className={cxs({ display: 'flex', flexWrap: 'wrap' })}>
                    { Object.keys(breakouts).map(breakout =>
                        <li
                            onClick={() =>
                                selectAndAdvance(() =>
                                    selectMetricBreakout(breakouts[breakout])
                                )
                            }
                            onMouseEnter={() => {
                                if(breakouts[breakout].description) {
                                    setTip({
                                        title: breakouts[breakout].display_name,
                                        text: breakouts[breakout].description
                                    })
                                }
                                return false
                            }}
                            onMouseLeave={() => setTip(this.tip)}
                            className={cxs({ flex: '0 0 33.33%', padding: '1em' })}
                            key={breakouts[breakout].id}
                        >
                            <Card name={ breakouts[breakout].display_name } />
                        </li>
                    )}
                </ol>
            </div>
        )
    }
}

export default BreakoutSelection;
