import React, { Component } from "react";

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import LoadingAndErrorWrapper from "metabase/components/LoadingAndErrorWrapper";

const MyQuery = gql`{
  table(id: "1") {
    id, name, display_name
    fields {
      id, name, display_name
    }
  }
}`;

@graphql(MyQuery)
export default class MyRootComponent extends Component {
    componentWillMount() {
        // this.props.data.startPolling(1000);
    }
    render() {
        const { data } = this.props;
        return (
            <div>
                <button onClick={() => data.refetch()} className={data.loading ? "disable" : null}>Reload</button>
                <LoadingAndErrorWrapper loading={data.loading} error={data.error}>
                { () =>
                    <pre>{JSON.stringify(data.table, null, 2)}</pre>
                }
                </LoadingAndErrorWrapper>
            </div>
        )
    }
}
