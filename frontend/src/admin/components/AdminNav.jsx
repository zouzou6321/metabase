import React, { PropTypes } from "react";

import AdminNavWrapper from "metabase/admin/components/AdminNavWrapper.jsx";
import AdminNavItems from "metabase/admin/components/AdminNavItems.jsx";
import AdminNavTitle from "metabase/admin/components/AdminNavWrapper.jsx";
import ProfileLink from "metabase/components/ProfileLink.jsx";

const AdminNav = (props) =>
  <AdminNavWrapper>
    <AdminNavTitle />
    <AdminNavItems location={props.location} />
    <ProfileLink {...props} />
  </AdminNavWrapper>

export default AdminNav;
