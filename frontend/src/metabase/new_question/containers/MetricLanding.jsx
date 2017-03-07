import cxs from 'cxs';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { newMetric } from '../actions'
import { fetchMetrics } from 'metabase/redux/metadata';

import Button from 'metabase/components/Button';

import Text from '../components/Text';

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
                    <div className={cxs({ display: 'flex' })}>
                        <h3>Existing metrics</h3>
                        <Button
                            className="ml-auto"
                            onClick={() => newMetric()}
                            primary
                        >
                            A fresh metric
                        </Button>
                    </div>
                    <ol>
                        { Object.keys(metrics).map(metric =>
                            <li
                                key={metric}
                            >
                                <h2 className="link">{ metrics[metric].name }</h2>
                                <Text>{ metrics[metric].description }</Text>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default MetricLanding;
