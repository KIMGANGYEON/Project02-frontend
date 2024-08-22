import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  const getCart = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}user/cart`,
        { withCredentials: true }
      );
      setUserData(response.data.user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          navigate("/project02/login");
          alert("로그인이 필요합니다");
        }
      }
    }
  };
  console.log(userData);

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div>Cart</div>
    </>
  );
};

export default Cart;
