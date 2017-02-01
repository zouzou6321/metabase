/* @flow */

import React, { Component, PropTypes } from "react";

import Select, { Option } from "metabase/components/Select";
import Icon from "metabase/components/Icon";
import ExternalLink from "metabase/components/ExternalLink";

import { assocIn } from "icepick";

import KJUR from "jsrsasign";

type Props = {
    settingValues: { [key: string]: any }
};

type State = {
    codeSample: string,
    resourceId: string,
    resourceType: string,
    parameters: Array<{ key: string, value: string }>
};

const getPreviewUrl = (siteUrl, secretKey, resourceType, resourceId, params = {}) => {
    // using jsrsasign because jsonwebtoken doesn't work on the web :-/
    let token = KJUR.jws.JWS.sign(null, {
        alg: "HS256",
        typ: "JWT"
    }, {
        resource: { [resourceType]: resourceId },
        params: params,
        iat: Math.round(new Date().getTime() / 1000)
    }, { utf8: secretKey });
    return `${siteUrl}/embed/${resourceType}/${token}`;
}

const CODE_SAMPLES = {
    "Node.js": (siteUrl, secretKey, resourceType, resourceId, params = {}) =>
`var jwt = require("jsonwebtoken");

var METABASE_SITE_URL = ${JSON.stringify(siteUrl)};
var METABASE_SECRET_KEY = ${JSON.stringify(secretKey)};

var payload = {
  resource: { ${resourceType}: ${resourceId} },
  params: ${JSON.stringify(params, null, 2).split("\n").join("\n  ")}
};
var token = jwt.sign(payload, METABASE_SECRET_KEY);

console.log(METABASE_SITE_URL + "/embed/${resourceType}/" + token);`,

    "Ruby": (siteUrl, secretKey, resourceType, resourceId, params = {}) =>
`require 'jwt'

METABASE_SITE_URL = ${JSON.stringify(siteUrl)}
METABASE_SECRET_KEY = ${JSON.stringify(secretKey)}

payload = {
  :resource => {:${resourceType} => ${resourceId}},
  :params => {
    ${Object.entries(params).map(([key,value]) => JSON.stringify(key) + " => " + JSON.stringify(value)).join(",\n    ")}
  }
}
token = JWT.encode payload, METABASE_SECRET_KEY

puts METABASE_SITE_URL + "/embed/${resourceType}/" + token
`
}

export default class EmbedSampleWidget extends Component<*, Props, State> {
    props: Props;
    state: State;
    constructor(props: Props) {
        super(props);
        this.state = {
            codeSample: Object.keys(CODE_SAMPLES)[0],
            resourceType: "dashboard",
            resourceId: "173",
            parameters: [{ key: "foo", value: "bar" }]
        };
    }

    static defaultProps = {};

    render() {
        const { settingValues } = this.props;
        const { resourceType, resourceId, parameters, codeSample } = this.state;
        const siteUrl = settingValues["-site-url"];
        const secretKey = settingValues["embedding-secret-key"];
        const params = parameters.reduce((o, p) => ({ ...o, [p.key]: p.value }), {});

        const formatCodeSample = CODE_SAMPLES[codeSample];

        return (
            <div>
                <Select value={codeSample} onChange={(e) => this.setState({ codeSample: e.target.value })}>
                    {Object.keys(CODE_SAMPLES).map(name =>
                        <Option key={name} value={name}>{name}</Option>
                    )}
                </Select>

                <div className="text-code my1" style={{ padding: "1em" }}>
                    {formatCodeSample(siteUrl, secretKey, resourceType, parseFloat(resourceId), params)}
                </div>

                <ConfigurationPane className="my1" state={this.state} setState={this.setState.bind(this)} />

                <ExternalLink href={getPreviewUrl(siteUrl, secretKey, resourceType, parseFloat(resourceId), params)}>Preview...</ExternalLink>
            </div>
        );
    }
}
const ConfigurationPane = ({ className, state: { resourceId, resourceType, parameters }, setState }) =>
    <table className={className}>
        <tbody>
            <tr>
                <td className="pr1">Resource Type</td>
                <td>
                    <Select value={resourceType} onChange={(e) => setState({ resourceType: e.target.value })}>
                        <Option value="question">Question</Option>
                        <Option value="dashboard">Dashboard</Option>
                    </Select>
                </td>
            </tr>
            <tr>
                <td className="pr1">Resource ID</td>
                <td>
                    <input className="input input--small" value={resourceId} onChange={(e) => setState({ resourceId: e.target.value })} />
                </td>
            </tr>
            { parameters.map((parameter, index) =>
                <tr>
                    <td className="pr1">
                        {index === 0 ? "Parameters" : null}
                    </td>
                    <td className="flex align-center">
                        <input
                            className="input input--small mr1"
                            value={parameter.key}
                            onChange={(e) => setState({ parameters: assocIn(parameters, [index, "key"], e.target.value) })}
                        />
                        {"="}
                        <input
                            className="input input--small ml1"
                            value={parameter.value}
                            onChange={(e) => setState({ parameters: assocIn(parameters, [index, "value"], e.target.value) })}
                        />
                        <Icon
                            name="close"
                            className="ml1 cursor-pointer text-grey-2 text-grey-4-hover"
                            onClick={() => setState({ parameters: [...parameters.slice(0,index), ...parameters.slice(index + 1)]})}
                        />
                    </td>
                </tr>
            )}
            <tr>
                <td>{parameters.length === 0 ? "Parameters" : null}</td>
                <td>
                    <button
                        className="Button Button--small"
                        onClick={() => setState({ parameters: parameters.concat({ key: "", value: "" })})}
                    >
                        Add a parameter...
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
