import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Link } from "react-router-dom";

interface Product {
  title: string;
  _id: string;
  images: string[];
  price: number;
}

const UsedrProduct = () => {
  const [products, setProducts] = useState<Product[]>();

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}product/used`,
        { withCredentials: true }
      );
      setProducts(response.data.products);
    } catch (error) {}
  };

  console.log(products);

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <Helmet>
        <title>Used Product</title>
      </Helmet>
      <div className="usedproduct">
        <div className="usedproduct_header">
          <h1>중고상품</h1>
        </div>
        {products?.map((item) => (
          <div key={item._id} className="usedproduct_box">
            <Swiper
              cssMode={true}
              navigation={true}
              pagination={true}
              mousewheel={true}
              keyboard={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              className="mySwiper"
            >
              {item.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={`${process.env.REACT_APP_BASE_URL}${img}`} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="usedproduct_text">
              <Link to={`/project02/product/used/detail/${item._id}`}>
                <h1>{item.title}</h1>
              </Link>
              <h2>{item.price.toLocaleString("ko-KR")} 원</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsedrProduct;
