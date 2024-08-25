import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import NewBookData from "./Cart/NewBookData";
import UsedBookData from "./Cart/UsedBookData";

interface ProductData {
  id: string;
  quantity: number;
  date: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [newBook, setNewBook] = useState<ProductData[]>([]);
  const [usedBook, setUsedBook] = useState<ProductData[]>([]);

  console.log(usedBook);

  const getCart = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}user/cart`,
        { withCredentials: true }
      );
      setUserData(response.data.user);
      setNewBook(response.data.user.cart.new);
      setUsedBook(response.data.user.cart.used);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          navigate("/project02/login");
          alert("로그인이 필요합니다");
        }
      }
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {userData ? (
        <div className="usercart">
          <div className="usercart_header">
            <h1>장바구니</h1>
          </div>
          <div className="usercart_item">
            <div className="newitem">
              <div className="newitem_box">
                <NewBookData productData={newBook} />
              </div>
            </div>
            <div className="useditem">
              <UsedBookData productData={usedBook} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Cart;
