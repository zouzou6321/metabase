import React, { Component } from 'react';
import Title from '../components/Title';

import Tip from './Tip';
import ExpandingSearchField from 'metabase/questions/components/ExpandingSearchField';

const SchemaList = ({ items, grid }) =>
    <div>
        <ExpandingSearchField />
        <ol>
            {items.map((item, index) =>
                <li key={index}>{item.name}</li>
            )}
        </ol>
    </div>


class QueryType extends Component {
    render () {
        return (
            <div className="wrapper py4">
                <Title>Query type</Title>
                <div>
                    <div>
                        <h3>Pick a database</h3>
                        <SchemaList
                            items={[
                                { name: 'Accounts' },
                                { name: 'Orders' },
                                { name: 'Derp' }
                            ]}
                        />
                    </div>
                    <Tip />
                </div>
            </div>
        )
    }
}

export default QueryType;
