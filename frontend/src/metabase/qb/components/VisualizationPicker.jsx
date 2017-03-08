/* @flow */

import React, { Component, PropTypes } from "react";

import Visualizations from "metabase/visualizations";
import Icon from "metabase/components/Icon";

import cx from "classnames";

type Props = {};

const VisualizationPicker = ({ card, visualizations, setDisplayFn }: Props) => {
    if (!card) {
        return null;
    }
    visualizations = visualizations || Array.from(Visualizations.keys());
    return (
        <ul className="flex align-center">
            {visualizations
                .map(name => Visualizations.get(name))
                .map(Visualization => (
                    <li>
                        <Icon
                            name={Visualization.iconName}
                            tooltip={Visualization.uiName}
                            className={cx(
                                "text-default-hover cursor-pointer mr2",
                                card.display === Visualization.identifier
                                    ? "text-default"
                                    : "text-grey-2"
                            )}
                            onClick={() =>
                                setDisplayFn(Visualization.identifier)}
                        />
                    </li>
                ))}
        </ul>
    );
};

export default VisualizationPicker;
