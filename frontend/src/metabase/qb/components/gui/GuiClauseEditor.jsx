/* @flow */

import React, { Component, PropTypes } from "react";

import PopoverWithTrigger from "metabase/components/PopoverWithTrigger";
import Icon from "metabase/components/Icon";

import cx from "classnames";

const QBTextButton = ({ className, children, ...props }) => (
    <span className={cx(className, "h5 text-bold text-grey-4")} {...props}>
        {children}
    </span>
);

const QBAddButton = props => <QBTextButton {...props}>Add</QBTextButton>;
const QBEditButton = props => <QBTextButton {...props}>Edit</QBTextButton>;

class GuiClauseEditor extends Component {
    render() {
        const { items, canAdd, onRemove, renderItem, renderEdit } = this.props;
        return (
            <div>
                {items && items.length > 0
                    ? items.map((item, index) => (
                          <div className="mb1 flex align-center">
                              {renderItem({ item, index })}
                              {renderEdit || onRemove
                                  ? <div className="ml-auto flex align-center">
                                        {renderEdit &&
                                            <PopoverWithTrigger
                                                triggerElement={
                                                    <QBEditButton />
                                                }
                                                triggerClasses="ml1"
                                                ref={p => this._popover = p}
                                            >
                                                {renderEdit({
                                                    item,
                                                    index,
                                                    onClose: () =>
                                                        this._popover.close()
                                                })}
                                            </PopoverWithTrigger>}
                                        {onRemove &&
                                            <Icon
                                                name="close"
                                                size={14}
                                                className="ml1 cursor-pointer text-grey-2 text-grey-4-hover"
                                                onClick={() =>
                                                    onRemove({ item, index })}
                                            />}
                                    </div>
                                  : null}
                          </div>
                      ))
                    : null}
                {canAdd
                    ? <div>
                          <PopoverWithTrigger
                              triggerElement={<QBAddButton />}
                              ref={p => this._addPopover = p}
                          >
                              {renderEdit({
                                  item: null,
                                  index: (items && items.length) || 0,
                                  onClose: () => this._addPopover.close()
                              })}
                          </PopoverWithTrigger>
                      </div>
                    : null}
            </div>
        );
    }
}

export default GuiClauseEditor;
