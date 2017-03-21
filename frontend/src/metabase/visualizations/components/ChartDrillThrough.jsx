/* @flow */

import React, { Component, PropTypes } from "react";

import Button from "metabase/components/Button";
import Popover from "metabase/components/Popover";

import type { ClickObject, DrillAction } from "metabase/visualizations";
import type { Card } from "metabase/meta/types/Card";

type Props = {
    clicked: ClickObject,
    drillActions: ?DrillAction[],
    onChangeCardAndRun: (card: Card) => void,
    onClose: () => void
};

type State = {
    popoverIndex: ?number;
}

export default class ChartDrillThrough extends Component<*, Props, State> {
    state: State = {
        popoverIndex: null
    };

    close = () => {
        this.setState({ popoverIndex: null });
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        const { clicked, drillActions, onChangeCardAndRun } = this.props;

        if (!clicked || !drillActions || drillActions.length === 0) {
            return null;
        }

        const { popoverIndex } = this.state;
        let popover;
        if (popoverIndex != null) {
            const PopoverContent = drillActions[popoverIndex].popover;
            popover = (
                <PopoverContent
                    onChangeCardAndRun={onChangeCardAndRun}
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
                                        onChangeCardAndRun(typeof action.card === "function" ? action.card() : action.card);
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
