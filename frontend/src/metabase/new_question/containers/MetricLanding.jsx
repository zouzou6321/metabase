import React, { Component } from 'react';
import { connect } from 'react-redux';

import { newMetric } from '../actions'
import { fetchMetrics } from 'metabase/redux/metadata';


const mapStateToProps = (state) => ({
    metrics: state.metadata.metrics // TODO - use a selector here
})

const mapDispatchToProps = ({
    newMetric,
    fetchMetrics
})

@connect(mapStateToProps, mapDispatchToProps)
class MetricLanding extends Component {
    async componentWillMount () {
        this.props.fetchMetrics()
    }
    render () {
        const { metrics, newMetric } = this.props;
        return (
            <div>
                <div>
                    <div
                        className="flex align-center justify-center bordered rounded border-dark"
                        onClick={() => newMetric()}
                    >
                        A fresh metric
                    </div>
                    <h3>Existing metrics</h3>
                    <ol>
                        { Object.keys(metrics).map(metric =>
                            <li key={metric}>{ metrics[metric].name }</li>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default MetricLanding;
