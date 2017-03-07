import cxs from 'cxs';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'metabase/components/Button';

import { advanceStep } from '../actions';
import { Sidebar } from '../components/Layout';

const MAP_OPTIONS = [
    { name: 'World', key: 'world' },
    { name: 'US State', key: 'us' },
]


@connect(() => ({}), ({
    advanceStep
}))
class MapLanding extends Component {
    constructor() {
        super();
        this.state = {
            selectedMap: MAP_OPTIONS[0]
        }
    }
    render () {
        const { advanceStep } = this.props;
        return (
            <div className="flex">
                <div className={cxs({ flex: 1 })}>
                    { this.state.selectedMap.name }
                    <Button
                        onClick={() => advanceStep()}
                        primary
                    >
                        Next
                    </Button>
                </div>
                <Sidebar>
                    <ol>
                    {
                        // lol
                        MAP_OPTIONS.map((map, index) =>
                            <li key={index}>{map.name}</li>
                        )
                    }
                    </ol>
                </Sidebar>
            </div>
        )
    }
}

export default MapLanding;
