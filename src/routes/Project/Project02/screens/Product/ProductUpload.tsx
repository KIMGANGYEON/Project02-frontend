import axios from "axios";
import React, {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { Helmet } from "react-helmet";
import { SubmitHandler, useForm } from "react-hook-form";
import FileUpload from "../../common/FileUpload";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface sendData {
  title: string;
  description: string;
  price: number;
}

const ProductUpload = () => {
  const [user, setUser] = useState();
  const [sendData, setSendData] = useState<boolean>(false);
  const navigate = useNavigate();
  const [productImages, setProductImages] = useState<{ images: string[] }>({
    images: [],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<sendData>({ mode: "onChange" });

  const onsubmit: SubmitHandler<sendData> = async (data) => {
    const body = {
      data,
      productImages,
    };
    try {
      reset();
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}product/upload`,
        body,
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        navigate("/project02");
        toast.success("상품 업로드에 성공하셨습니다");
      }
    } catch (error) {
      console.error(error);
    }
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

  const getAuth = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}product/upload`,
        { withCredentials: true }
      );
      if (response.status === 201) {
        setUser(response.data.user);
      }
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
    getAuth();
  }, []);

  function handleImages(newImages: string[]) {
    const flattenedImages = newImages.flat ? newImages.flat() : newImages;
    setProductImages((prevState) => ({
      ...prevState,
      images: flattenedImages,
    }));
  }
  return (
    <>
      <Helmet>
        <title>Upload Product</title>
      </Helmet>
      {user ? (
        <div className="upload_product">
          <div className="upload_product_header">
            <h1>상품 업로드 하기</h1>
          </div>
          <form onSubmit={handleSubmit(onsubmit)}>
            <FileUpload
              images={productImages.images}
              onImageChange={handleImages}
            />

            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              placeholder="제목을 입력해 주세요"
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
      ) : null}
    </>
  );
};

export default ProductUpload;
