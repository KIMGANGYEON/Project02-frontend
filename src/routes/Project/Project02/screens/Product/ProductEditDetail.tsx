import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import FileUpload from "../../common/FileUpload";

interface product {
  title: string;
  description: string;
  price: number;
  images: string[];
}

interface sendData {
  title: string;
  description: string;
  price: number;
}

const ProductEditDetail = () => {
  const { id } = useParams<string>();
  const [product, setProduct] = useState<product>();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}product/edit/detail/${id}`,
        { withCredentials: true }
      );
      const productData = response.data.product[0];
      setProduct(productData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          navigate("/project02/login");
          alert("로그인이 필요합니다");
        }
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm<sendData>({ mode: "onChange" });

  const onsubmit = () => {};

  const productTitle = {
    required: "제목을 입력해 주세요",
  };

  const productDescription = {
    required: "설명을 입력해 주세요",
  };

  const productPrice = {
    required: "가격을 입력해 주세요",
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(product);

  return (
    <>
      <Helmet>
        <title>Product Edit</title>
      </Helmet>

      <div className="upload_product">
        <div className="upload_product_header">
          <h1>상품 수정 하기</h1>
        </div>
        <form onSubmit={handleSubmit(onsubmit)}>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            placeholder="제목을 입력해 주세요"
            defaultValue={product?.title}
            {...register("title", productTitle)}
          />
          {errors?.title && (
            <div style={{ marginTop: 8 }}>
              <span style={{ color: "red" }}>
                {(errors.title as any).message}
              </span>
            </div>
          )}

          <label htmlFor="price">가격</label>
          <input
            type="number"
            id="price"
            placeholder="가격을 입력해 주세요"
            defaultValue={product?.price}
            {...register("price", productPrice)}
          />

          {errors?.price && (
            <div style={{ marginTop: 8 }}>
              <span style={{ color: "red" }}>
                {(errors.price as any).message}
              </span>
            </div>
          )}

          <label htmlFor="description">설명</label>
          <textarea
            id="description"
            defaultValue={product?.description}
            placeholder="설명을 입력해 주세요"
            {...register("description", productDescription)}
          />
          {errors?.description && (
            <div style={{ marginTop: 8 }}>
              <span style={{ color: "red" }}>
                {(errors.description as any).message}
              </span>
            </div>
          )}
          <div className="product_puload_btn">
            <button type="submit">생성하기</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductEditDetail;
