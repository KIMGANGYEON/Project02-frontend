import React, { useEffect, useRef, useState } from "react";

interface Book {
  title: string;
  isbn: string;
  image: string;
  description: string;
  author: string;
}

interface dataProp {
  data: Book[];
  title: string;
}

const ProductBox: React.FC<dataProp> = ({ data, title }) => {
  const productRef = useRef<HTMLDivElement>(null);
  const [moveBox, setMoveBox] = useState(0);

  const handleMoveLeft = () => {
    if (moveBox === 0) {
      return;
    }
    setMoveBox((prev) => prev + 400);
  };
  const handleMoveRight = () => {
    if (moveBox === -5200) {
      return;
    }
    setMoveBox((prev) => prev - 400);
  };

  useEffect(() => {
    if (productRef.current) {
      const divCount =
        productRef.current?.querySelectorAll(".productbox_box").length;
    }
  }, [data]);

  return (
    <>
      <div style={{ overflow: "hidden", marginTop: 100 }}>
        <div className="productbox_header">
          <h1 className="productbox_title">{title}</h1>
          <button onClick={handleMoveLeft}>←</button>
          <button onClick={handleMoveRight}>→</button>
        </div>
        <div className="productbox" ref={productRef}>
          {data?.map((book) => (
            <div
              key={book.isbn}
              className="productbox_box"
              style={{ transform: `translateX(${moveBox}px)` }}
            >
              <img src={book.image} alt="" />
              <h1>{book.title}</h1>
              <h2>{book.author}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductBox;
