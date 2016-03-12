import React, { PropTypes } from "react";
import cx from "classnames";

const classes = "NavItem py1 px2 no-decoration";

const buildEventName = (name) => `Navbar; ${name}`;

const AdminNavItem = ({name, path, active}) =>
  <a metabase-event-name={buildEventName(name)}
     className={cx(classes, { 'is--selected': active })}
     href={`/admin/${path}/`}>
    {name}
  </a>

AdminNavItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
}

export default AdminNavItem;
