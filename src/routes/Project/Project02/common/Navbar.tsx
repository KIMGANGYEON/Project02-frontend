import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showMenubar, setShowMenubar] = useState(false);

  const handleShowMenubar = () => {
    setShowMenubar((prev) => !prev);
  };

  return (
    <>
      <div className="project02_navbar">
        {showMenubar && (
          <div className="project02_menubar">
            <span>내 정보 수정</span>
            <span>상품 업로드</span>
            <span>내 상품 수정</span>
            <span>장바구니</span>
            <span>결제내역</span>
          </div>
        )}
        <div className="project02_navbar_header">
          <div className="project02_navbar_header_title">
            <Link to={"/project02"}>
              <h1>Book</h1>
            </Link>
          </div>
          <div className="project02_navbar_header_text">
            <h1>검색하기</h1>
            <h1>
              <Link to={"/project02/login"}>로그인</Link>
            </h1>
            <h1 onClick={handleShowMenubar}>더보기</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
