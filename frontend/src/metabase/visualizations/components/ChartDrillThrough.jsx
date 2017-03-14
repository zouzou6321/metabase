/* @flow */

import React, { Component, PropTypes } from "react";

import Button from "metabase/components/Button";
import Popover from "metabase/components/Popover";

type Props = {
};

export default class ChartDrillThrough extends Component<*, Props, *> {
    constructor(props: Props) {
        super(props);
        this.state = {
            popoverIndex: null
        }
    }

    close = () => {
        this.setState({ popoverIndex: null });
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        const { clicked, drillActions, onDrillThrough } = this.props;

        if (!clicked || !drillActions || drillActions.length === 0) {
            return null;
        }

        const { popoverIndex } = this.state;
        let popover;
        if (popoverIndex != null) {
            const PopoverContent = drillActions[popoverIndex].popover;
            popover = (
                <PopoverContent
                    onAction={onDrillThrough}
                    onClose={this.close}
                />
            );
        }

        return (
            <Popover
                target={clicked.element}
                targetEvent={clicked.event}
                onClose={this.close}
                verticalAttachments={["bottom", "top"]}
            >
                { popover ?
                    popover
                :
                    <div className="px1 pt1 flex flex-column">
                        { drillActions.map((action, index) =>
                            <Button
                                className="mb1"
                                medium
                                onClick={() => {
                                    if (action.popover) {
                                        this.setState({ popoverIndex: index });
                                    } else {
                                        onDrillThrough(typeof action.card === "function" ? action.card() : action.card);
                                        this.close();
                                    }
                                }}
                            >
                                {action.title}
                            </Button>
                        )}
                    </div>
                }
            </Popover>
        );
    }
}
