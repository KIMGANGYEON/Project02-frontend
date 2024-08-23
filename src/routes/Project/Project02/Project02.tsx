import React, { useEffect } from "react";
import Navbar from "./common/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Join from "./screens/Join";
import { useRecoilValue } from "recoil";
import EdituserProfile from "./screens/EdituserProfile";
import ProductDetail from "./screens/Product/ProductDetail";
import ProductUpload from "./screens/Product/ProductUpload";
import ProductEdit from "./screens/Product/ProductEdit";
import ProductEditDetail from "./screens/Product/ProductEditDetail";
import Cart from "./screens/Cart";
import UsedrProduct from "./screens/Product/UsedrProduct";
import UsedProductDetail from "./screens/Product/UsedProductDetail";

const Layout = () => {
  return (
    <div style={{ overflowX: "hidden", paddingBottom: 30 }}>
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
        <Route path="user/editprofile" element={<EdituserProfile />} />
        <Route path="user/cart" element={<Cart />} />

        <Route path="product/used" element={<UsedrProduct />} />
        <Route path="product/used/detail/:id" element={<UsedProductDetail />} />

        <Route path="product/upload" element={<ProductUpload />} />
        <Route path="product/edit" element={<ProductEdit />} />
        <Route path="product/edit/:id" element={<ProductEditDetail />} />
        <Route path="product/detail/:id" element={<ProductDetail />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Project02;
