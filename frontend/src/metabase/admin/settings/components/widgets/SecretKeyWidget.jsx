/* @flow */

import React, { Component, PropTypes } from "react";

import SettingInput from "./SettingInput";
import Button from "metabase/components/Button";

import { UtilApi } from "metabase/services";

type Props = {
};

export default class SecretKeyWidget extends Component<*, Props, State> {
    props: Props;

    _generateToken = async () => {
        const { updateSetting } = this.props;
        const result = await UtilApi.random_token();
        updateSetting(result.token);
    }

    render() {
        const { setting } = this.props;
        return (
            <div className="flex align-center">
                <SettingInput {...this.props} />
                <Button className="ml1" primary medium onClick={this._generateToken}>{setting.value ? "Regenerate" : "Regenerate"} Token</Button>
            </div>
        );
    }
}
