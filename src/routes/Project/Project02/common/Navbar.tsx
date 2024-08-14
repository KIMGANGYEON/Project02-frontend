import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isAuth } from "../../../../atom";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [showMenubar, setShowMenubar] = useState(false);
  const [userState, setUserState] = useRecoilState(isAuth);
  const handleShowMenubar = () => {
    setShowMenubar((prev) => !prev);
  };

  const handleLogout = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}user/logout`,
      {},
      { withCredentials: true } // withCredentials 옵션 추가
    );
    if (response.status === 201) {
      setUserState({ isLoggedin: false });
      window.location.reload();
      toast.success("로그아웃에 성공하셨습니다");
    }
  };
  return (
    <>
      <div className="project02_navbar">
        {showMenubar && (
          <div className="project02_menubar">
            <Link to={"/project02/user/editprofile"}>
              <span>내 정보 수정</span>
            </Link>
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

            {userState.isLoggedIn ? (
              <h1 onClick={handleLogout}>로그아웃</h1>
            ) : (
              <h1>
                <Link to={"/project02/login"}>로그인</Link>
              </h1>
            )}

            {userState.isLoggedIn && (
              <h1 onClick={handleShowMenubar}>더보기</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
