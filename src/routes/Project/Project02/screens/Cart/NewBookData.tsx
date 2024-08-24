import axios from "axios";
import React, { useEffect, useState } from "react";

interface ProductData {
  id: string;
  quantity: number;
  date: number;
}

interface Product {
  title: string;
  image: string;
  isbn: string;
}

interface ProductArray {
  items: Product[];
}

const NewBookData: React.FC<{ productData: ProductData[] }> = ({
  productData,
}) => {
  const [books, setBooks] = useState<(Product & { quantity: number })[]>([]);

  const getBookData = async () => {
    if (productData.length === 0) {
      console.warn("No product data provided.");
      return;
    }

    try {
      const requests = productData.map((product) =>
        axios.get<ProductArray>("/v1/search/book.json", {
          params: {
            query: product.id,
            display: 1,
            start: 1,
            sort: "sim",
          },
          headers: {
            "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
            "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
          },
        })
      );

      const responses = await Promise.all(requests);

      const detailedBooks = responses
        .flatMap((response) => response.data.items)
        .map((item) => {
          const product = productData.find((p) => p.id === item.isbn);
          return {
            ...item,
            quantity: product ? product.quantity : 0,
          };
        });

      setBooks(detailedBooks);
      console.log(detailedBooks);
    } catch (error) {
      console.error("Error fetching book details", error);
    }
  };

  useEffect(() => {
    getBookData();
  }, [productData]);

  return (
    <div className="newbookcart">
      <div className="newbookcart_header">
        <h1>새상품</h1>
      </div>
      {books.length > 0 ? (
        books.map((item, index) => (
          <div key={index} className="newbookcart_product">
            <div className="newbookcart_product_img">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="newbookcart_product_text">
              <h1>{item.title}</h1>
              <h2>수량: {item.quantity}</h2>
            </div>
          </div>
        ))
      ) : (
        <p>상품이 없습니다</p>
      )}
    </div>
  );
};

export default NewBookData;
