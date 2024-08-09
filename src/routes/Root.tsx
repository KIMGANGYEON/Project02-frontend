import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Screens/Home";
import Porject01 from "./Project/Porject01";

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project01" element={<Porject01 />} />
    </Routes>
  );
};

export default Root;
