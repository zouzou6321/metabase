import cxs from 'cxs';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { normal } from 'metabase/lib/colors';
import { selectFlow } from '../actions'

const queryTypes = [
    { name: 'A metric', type: 'metric' },
    { name: 'A metric on a map', type: 'map' },
    { name: 'Segment or table', type: 'segment' },
    { name: 'A metric on a timeseries', type: 'time' },
    { name: 'Pivot a metric', type: 'pivot' },
    { name: 'SQL', type: 'sql' },
]

@connect(() => ({}),({
    selectFlow: (flowType) => selectFlow(flowType)
}))
class QueryTypeList extends Component {
    render () {
        return (
            <ol className={cxs({
                display: 'flex',
                flex: 1,
                flexWrap: 'wrap'
            })}>
                { queryTypes.map((type, index) =>
                    <li
                        className={`p3 ${cxs({flex: '0 0 33.33%',})}`}
                        key={type.type}
                        onClick={() => this.props.selectFlow(type.type)}
                    >
                        <div className={cxs({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: 220,
                            border: '1px solid #ddd',
                            borderRadius: 4,
                            ':hover': {
                                backgroundColor: normal.blue,
                                color: '#fff',
                                borderColor: normal.blue,
                                cursor: 'pointer'
                            }
                        })}>
                            <h3>{type.name}</h3>
                        </div>
                    </li>
                  )
                }
            </ol>
        )
    }
}

export default QueryTypeList;
