import React, { PropTypes } from "react";
import { isActive } from "metabase/lib/urls";

import AdminNavItem from "metabase/admin/components/AdminNavItem.jsx";

const items = [
  { name: 'Settings', path: 'settings' },
  { name: 'People', path: 'people' },
  { name: 'Data Model', path: 'datamodel/database' },
  { name: 'Databases', path: 'databases' },
];

const AdminNavItems = ({location}) =>
  <ul className="sm-ml4 flex flex-full">
    { items.map((item, index) =>
        <li key={index}>
          <AdminNavItem
            name={item.name}
            path={item.path}
            active={isActive(location, item.path)}
          />
        </li>
      )
    }
  </ul>

AdminNavItems.propTypes = {
  location: PropTypes.object.isRequired
}

export default AdminNavItems;
