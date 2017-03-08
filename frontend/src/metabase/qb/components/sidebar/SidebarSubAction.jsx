/* @flow */

import React, { Component, PropTypes } from "react";
import Icon from "metabase/components/Icon";
import cx from "classnames";

const SidebarSubAction = ({ className, children, icon, onClick }) =>
    <div className={cx(className, "flex align-center cursor-pointer h5 text-bold text-grey-4")} onClick={onClick}>
        { icon && <Icon name={icon} className="mr1" /> }
        {children}
    </div>

export default SidebarSubAction;
