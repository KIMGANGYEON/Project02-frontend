import React from "react";
import Navbar from "./common/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Join from "./screens/Join";
import { useRecoilValue } from "recoil";
import Notauthroutes from "./common/Notauthroutes";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

const Project02 = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* <Route element={<Notauthroutes isAuth={value.isLoggedIn} />}> */}
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        {/* </Route> */}

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Project02;
