import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

interface Product {
  title: string;
  description: string;
  price: number;
  images: string[];
}

const UsedProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}user/add/used/cart/${id}`,
        { withCredentials: true }
      );
      setUser(response.data.user);
      setProduct(response.data.product[0]);
    } catch (error) {}
  };

  useEffect(() => {
    getProduct();
  }, []);

  console.log(product);

  const handleClick = () => {
    if (!user) {
      const login = window.confirm("로그인이 필요합니다 로그인 하시겠습니까?");
      if (login) {
        navigate("/project02/login");
      } else {
        return;
      }
    } else {
    }
  };
  return (
    <>
      <Helmet>
        <title>{product?.title}</title>
      </Helmet>
      <div className="usedproductdetail">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {product?.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={`${process.env.REACT_APP_BASE_URL}${img}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="usedproductdetail_text">
          <h1>{product?.title}</h1>
          <h2>{product?.description}</h2>
          <h3>{product?.price.toLocaleString("ko-KR")} 원</h3>
          <div className="useproductdetail_btn">
            <button onClick={handleClick}>장바구니</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsedProductDetail;
