import React from "react";
import Icon from "metabase/components/Icon.jsx";

const AdminNavTitle = () =>
  <div className="NavTitle flex align-center">
    <Icon name='gear' className="AdminGear" width={22} height={22}></Icon>
    <span className="NavItem-text ml1 hide sm-show">Site Administration</span>
  </div>

export default AdminNavTitle;
