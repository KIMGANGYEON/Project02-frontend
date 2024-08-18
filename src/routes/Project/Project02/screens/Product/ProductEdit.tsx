import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  title: string;
}

const ProductEdit = () => {
  const native = useNavigate();
  const [user, setUser] = useState();
  const [products, setProducts] = useState<Product[]>([]);

  const getProductEdit = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}product/edit`,
        { withCredentials: true }
      );
      if (response.status === 201) {
        setUser(response.data.user);
        setProducts(response.data.product);
        console.log(products);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          native("/project02/login");
          alert("로그인이 필요합니다");
        }
      }
    }
  };

  useEffect(() => {
    getProductEdit();
  }, []);

  return (
    <>
      {user ? (
        <div>
          <div>
            <h1>hello</h1>
          </div>
          {products?.map((item) => (
            <div key={item._id}>{item.title}</div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default ProductEdit;
