import React from "react";

const AdminNavWrapper = ({children}) =>
  <nav className="AdminNav text-white">
    <div className="wrapper flex align-center">
      {children}
    </div>
  </nav>

export default AdminNavWrapper;
