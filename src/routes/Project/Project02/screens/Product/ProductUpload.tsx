import axios from "axios";
import React, { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { Helmet } from "react-helmet";
import { SubmitHandler, useForm } from "react-hook-form";

interface sendData {
  title: string;
  description: string;
  price: number;
  images: File[];
}

const ProductUpload = () => {
  const [images, setImages] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<sendData>({ mode: "onChange" });

  const onsubmit: SubmitHandler<sendData> = async (data) => {
    try {
      reset();
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}product/upload`,
        data,
        { withCredentials: true }
      );
    } catch (error) {}
  };

  const productTitle = {
    required: "제목을 입력해 주세요",
  };

  const productDescription = {
    required: "설명을 입력해 주세요",
  };

  const productPrice = {
    required: "가격을 입력해 주세요",
  };

  return (
    <>
      <Helmet>
        <title>Upload Product</title>
      </Helmet>
      <div className="upload_product">
        <div className="upload_product_header">
          <h1>상품 업로드 하기</h1>
        </div>
        <form onSubmit={handleSubmit(onsubmit)}>
          <input type="file" id="images" multiple />

          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            placeholder="제목을 입력해 주세요"
            {...register("title", productTitle)}
          />
          {errors?.title && (
            <div>
              <span>{(errors.title as any).message}</span>
            </div>
          )}
          <label htmlFor="description">설명</label>
          <input
            type="text"
            id="description"
            placeholder="설명을 입력해 주세요"
            {...register("description", productDescription)}
          />
          {errors?.description && (
            <div>
              <span>{(errors.description as any).message}</span>
            </div>
          )}
          <label htmlFor="price">가격</label>
          <input
            type="number"
            id="price"
            placeholder="가격을 입력해 주세요"
            {...register("price", productPrice)}
          />

          {errors?.price && (
            <div>
              <span>{(errors.price as any).message}</span>
            </div>
          )}
          <div>
            <button type="submit">생성하기</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductUpload;
