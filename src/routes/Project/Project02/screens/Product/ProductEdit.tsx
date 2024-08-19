import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  title: string;
  images: string;
  createdAt: string;
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
      <Helmet>
        <title>Product Edit</title>
      </Helmet>
      {user ? (
        <div className="productedit">
          <div className="productedit_header">
            <h1>내 상품 수정</h1>
          </div>
          {products.length === 0 ? (
            <div style={{ marginTop: 50 }}>
              <h1 style={{ fontSize: 30 }}>등록한 상품이 없습니다</h1>
            </div>
          ) : (
            <>
              {products?.map((item) => (
                <div key={item._id} className="productedit_box">
                  <div className="productedit_img">
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}${item.images[0]}`}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div className="productedit_text">
                      <h1>{item.title}</h1>
                      <h2>{item.createdAt.split("T")[0]}</h2>
                    </div>
                    <div className="productedit_btn">
                      <Link to={`/project02/product/edit/${item._id}`}>
                        <button>수정</button>
                      </Link>
                      <button>삭제</button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default ProductEdit;
