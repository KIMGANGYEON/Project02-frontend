import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ProductData {
  id: string;
  quantity: number;
  date: number;
}

interface Product {
  title: string;
  image: string;
  isbn: string;
  discount: number;
}

interface ProductArray {
  items: Product[];
}

const NewBookData: React.FC<{ productData: ProductData[] }> = ({
  productData,
}) => {
  const [books, setBooks] = useState<(Product & { quantity: number })[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<
    (Product & { quantity: number })[]
  >([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

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
    } catch (error) {
      console.error("Error fetching book details", error);
    }
  };

  useEffect(() => {
    getBookData();
  }, [productData]);

  useEffect(() => {
    const newTotalAmount = selectedBooks.reduce((acc, book) => {
      const currentBook = books.find((b) => b.isbn === book.isbn);
      const quantity = currentBook ? currentBook.quantity : 0;
      return acc + quantity * book.discount;
    }, 0);

    setTotalAmount(newTotalAmount);
  }, [selectedBooks, books]);

  const handleCheckboxChange = (book: Product & { quantity: number }) => {
    setSelectedBooks((prevSelectedBooks) => {
      if (
        prevSelectedBooks.some(
          (selectedBook) => selectedBook.isbn === book.isbn
        )
      ) {
        return prevSelectedBooks.filter(
          (selectedBook) => selectedBook.isbn !== book.isbn
        );
      } else {
        return [...prevSelectedBooks, book];
      }
    });
  };

  const handleQuantityChange = async (isbn: string, delta: number) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.isbn === isbn
          ? { ...book, quantity: Math.max(0, book.quantity + delta) }
          : book
      )
    );
    const body = { isbn, delta };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}user/new/cart/edit`,
        body,
        { withCredentials: true }
      );
      if (response.status === 201) {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}user/new/cart/delete`,
        { id },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.isbn !== id));
        setSelectedBooks((prevSelectedBooks) =>
          prevSelectedBooks.filter((book) => book.isbn !== id)
        );
        toast.success("장바구니에서 삭제되었습니다");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="newbookcart">
      <div className="newbookcart_header">
        <h1>새상품</h1>
      </div>
      {books.length > 0 ? (
        books.map((item, index) => (
          <div key={index} className="newbookcart_product">
            <div className="newbookcart_product_img">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(item)}
              />
              <img src={item.image} alt={item.title} />
            </div>
            <div className="newbookcart_product_text">
              <h1>{item.title}</h1>
              <div className="item_count">
                <button onClick={() => handleQuantityChange(item.isbn, -1)}>
                  -
                </button>
                <span>수량: {item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.isbn, 1)}>
                  +
                </button>
              </div>
              <div style={{ display: "flex" }}>
                <h3>
                  가격:{" "}
                  {(item.discount * item.quantity).toLocaleString("ko-KR")} 원
                </h3>
                <button
                  onClick={() => handleDeleteItem(item.isbn)}
                  style={{ marginLeft: 30 }}
                >
                  삭제하기
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>상품이 없습니다</p>
      )}
      <div className="total_price">
        <h1>총합계</h1>
        <h1>{totalAmount.toLocaleString("ko-KR")} 원</h1>
      </div>
    </div>
  );
};

export default NewBookData;
