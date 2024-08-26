import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ProductData {
  id: string;
  quantity: number;
  date: number;
}

interface BooksDetail {
  _id: string;
  id: string;
  images: string[];
  title: string;
  quantity: number;
  price: number;
}

const UsedBookData: React.FC<{ productData: ProductData[] }> = ({
  productData,
}) => {
  const [books, setBooks] = useState<BooksDetail[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<BooksDetail[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    console.log(selectedBooks);
    console.log(productData);
  }, [selectedBooks]);

  const getUsedBook = async () => {
    let cartItemIds: string[] = [];

    if (productData.length > 0) {
      productData.forEach((item) => cartItemIds.push(item.id));
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}product/used/cart`,
        { withCredentials: true }
      );
      if (response.status === 201) {
        setBooks(response.data.productDetails);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUsedBook();
  }, []);

  const handleCheckboxChange = (book: BooksDetail) => {
    setSelectedBooks((prevSelectedBooks) => {
      if (
        prevSelectedBooks.some((selectedBook) => selectedBook._id === book._id)
      ) {
        return prevSelectedBooks.filter(
          (selectedBook) => selectedBook._id !== book._id
        );
      } else {
        return [...prevSelectedBooks, book];
      }
    });
  };

  const handleQuantityChange = async (id: string, delta: number) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === id
          ? { ...book, quantity: Math.max(0, book.quantity + delta) }
          : book
      )
    );
    const body = { id, delta };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}user/used/cart/edit`,
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
        `${process.env.REACT_APP_BASE_URL}user/used/cart/delete`,
        { id },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
        setSelectedBooks((prevSelectedBooks) =>
          prevSelectedBooks.filter((book) => book._id !== id)
        );
        toast.success("장바구니에서 삭제되었습니다");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const newTotalAmount = selectedBooks.reduce((acc, book) => {
      const currentBook = books.find((b) => b._id === book._id);
      const quantity = currentBook ? currentBook.quantity : 0;
      return acc + quantity * book.price;
    }, 0);

    setTotalAmount(newTotalAmount);
  }, [selectedBooks, books]);

  return (
    <div className="newbookcart">
      <div className="newbookcart_header">
        <h1>중고상품</h1>
      </div>
      {books?.length > 0 ? (
        books?.map((item, index) => (
          <div key={index} className="newbookcart_product">
            <div className="newbookcart_product_img">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(item)}
              />
              <img
                src={`${process.env.REACT_APP_BASE_URL}${item.images[0]}`}
                alt={item.title}
                style={{
                  width: 200,
                  height: 100,
                }}
              />
            </div>
            <div className="newbookcart_product_text">
              <h1>{item.title}</h1>
              <div className="item_count">
                <button onClick={() => handleQuantityChange(item._id, -1)}>
                  -
                </button>
                <span>수량: {item.quantity}</span>
                <button onClick={() => handleQuantityChange(item._id, 1)}>
                  +
                </button>
              </div>
              <div style={{ display: "flex" }}>
                <h3>
                  가격: {(item.price * item.quantity).toLocaleString("ko-KR")}원
                </h3>
                <button
                  onClick={() => handleDeleteItem(item._id)}
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

export default UsedBookData;
