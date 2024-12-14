import React from "react";
import UserApplication from "./views/user/UserApplication";
import Login from "./layouts/Login";
import AdminApplication from "./views/admin/adminApplication";
import ProtectedHandler from "./utils/ProtectedHandler";
export default [
  {
    path: "/admin/dashboard",
    exact: true,
    component: () => <div> <ProtectedHandler/> <AdminApplication /> </div>
  },
  {
    path: "/admin/login",
    exact: true,
    component: Login,
  },
  {
    path: "/",
    exact: true,
    component: UserApplication,
  },
];
