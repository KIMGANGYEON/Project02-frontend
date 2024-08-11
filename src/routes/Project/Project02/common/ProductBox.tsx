import React from "react";

interface Book {
  title: string;
  isbn: string;
}

interface dataProp {
  data: Book[];
}

const ProductBox: React.FC<dataProp> = ({ data }) => {
  return (
    <>
      {data?.map((book) => (
        <div key={book.isbn}>
          <h1>{book.title}</h1>
        </div>
      ))}
    </>
  );
};

export default ProductBox;
