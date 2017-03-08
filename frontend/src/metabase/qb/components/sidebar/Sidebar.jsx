/* @flow */

import React, { Component, PropTypes } from "react";

import cx from "classnames";

type Props = {
    children: any
};

export default class Sidebar extends Component<*, Props, *> {
    render() {
        const { children, className } = this.props;
        return (
            <div
                className={cx(className, "bordered rounded shadowed")}
                style={{ width: 350 }}
            >
                {React.Children.map(children, child => (
                    <div className="border-row-divider">
                        {child}
                    </div>
                ))}
            </div>
        );
    }
}
