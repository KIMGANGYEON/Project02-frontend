import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookDetail } from "../../../../../api";
import { Helmet } from "react-helmet";
import axios from "axios";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const { data: book } = useQuery({
    queryKey: ["getDetail", id],
    queryFn: () => getBookDetail(id),
  });

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}user/add/cart`,
        { withCredentials: true }
      );
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    if (!user) {
      const login = window.confirm("로그인이 필요합니다 로그인 하시겠습니까?");
      if (login) {
        navigate("/project02/login");
      } else {
        return;
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}user/add/cart`,
          { id },
          { withCredentials: true }
        );
        if (response.status === 201) {
          toast.success("상품이 장바구니에 추가 되었습니다");
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Helmet>
        <title>{book?.title}</title>
      </Helmet>
      <div className="product_detail">
        <div className="product_detail_box">
          <div className="product_detail_img">
            <img src={book?.image} alt="" />
          </div>
          <div className="product_detail_text">
            <h1>{book?.title}</h1>
            <h2>{book?.author}</h2>
            <h3>{book?.description}</h3>
            <h4>{book?.discount}원</h4>
            <div className="product_detail_btn">
              <button onClick={handleClick}>장바구니</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
