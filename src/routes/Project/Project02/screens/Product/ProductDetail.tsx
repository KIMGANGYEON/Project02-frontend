import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getBookDetail } from "../../../../../api";

const ProductDetail = () => {
  const { id } = useParams();

  const { data: book } = useQuery({
    queryKey: ["getDetail", id],
    queryFn: () => getBookDetail(id),
  });
  return (
    <>
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
              <button>장바구니</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
