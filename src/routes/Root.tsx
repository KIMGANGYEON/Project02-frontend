import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Screens/Home";
import Porject01 from "./Project/Porject01";
import Project02 from "./Project/Project02/Project02";
import Login from "./Project/Project02/screens/Login";
import NotFound from "./Project/Project02/screens/NotFound";

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project01" element={<Porject01 />} />
      <Route path="/project02/*" element={<Project02 />} />
    </Routes>
  );
};

export default Root;
