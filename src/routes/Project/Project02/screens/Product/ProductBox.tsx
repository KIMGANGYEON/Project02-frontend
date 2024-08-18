import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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
    setMoveBox((prev) => prev + 705);
  };
  const handleMoveRight = () => {
    if (moveBox === -5640) {
      return;
    }
    setMoveBox((prev) => prev - 705);
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
            <Link to={`/project02/product/detail/${book.isbn}`} key={book.isbn}>
              <div
                className="productbox_box"
                style={{ transform: `translateX(${moveBox}px)` }}
              >
                <img src={book.image} alt="" />
                <h1>{book.title}</h1>
                <h2>{book.author}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductBox;
