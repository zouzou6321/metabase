/* @flow */

import React, { Component, PropTypes } from "react";

import Button from "metabase/components/Button";
import Popover from "metabase/components/Popover";

type Props = {
};

export default class ChartDrillThrough extends Component<*, Props, *> {
    render() {
        const { clicked, drillActions, onClose, onDrillThrough } = this.props;

        if (!clicked || !drillActions || drillActions.length === 0) {
            return null;
        }

        return (
            <Popover
                target={clicked.element}
                targetEvent={clicked.event}
                onClose={onClose}
                verticalAttachments={["bottom", "top"]}
            >
                <div className="p2">
                    { drillActions.map(action =>
                        <Button
                            onClick={() => {
                                onDrillThrough(typeof action.card === "function" ? action.card() : action.card);
                                onClose();
                            }}
                        >
                            {action.title}
                        </Button>
                    )}
                </div>
            </Popover>
        );
    }
}
