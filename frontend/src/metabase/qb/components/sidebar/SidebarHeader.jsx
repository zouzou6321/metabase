/* @flow weak */

import React, { Component, PropTypes } from "react";

import Icon from "metabase/components/Icon";
import Ellipsified from "metabase/components/Ellipsified";

const SidebarHeader = ({ children, onOpen, onClose }) => (
    <div
        className="h2 text-bold text-dark cursor-pointer flex align-center"
        onClick={onClose || onOpen}
    >
        <Ellipsified>{children}</Ellipsified>
        {onClose &&
            <div className="ml-auto text-grey-4 pl1 flex-no-shrink">
                <Icon name="contract" />
            </div>}
    </div>
);

export default SidebarHeader;
