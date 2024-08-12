import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Auth {
  isAuth: boolean;
}

const Notauthroutes: React.FC<Auth> = ({ isAuth }) => {
  return isAuth ? <Navigate to={"/project02"} /> : <Outlet />;
};

export default Notauthroutes;
