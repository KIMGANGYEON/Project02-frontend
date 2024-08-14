import axios from "axios";
import { Console } from "console";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface error {
  errorMessage: string;
}

interface sendData {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
}

interface userData {
  name: string;
  email: string;
}

function EdituserProfile() {
  const navigate = useNavigate();
  const [error, setError] = useState<error>();
  const [userData, setUserData] = useState<userData>();

  const getUserProfile = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}user/editprofile`,
        { withCredentials: true }
      );
      setUserData(response.data.user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          navigate("/project02/login");
          alert("로그인이 필요합니다");
        }
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<sendData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<sendData> = async (data) => {
    reset();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}user/editprofile`,
        data,
        { withCredentials: true }
      );
      if (response.status === 201) {
        setError(undefined);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
      }
    }
  };
  console.log(error);

  useEffect(() => {
    getUserProfile();
  }, []);

  const userName = {
    // required: "이름을 입력해 주세요",
  };

  const userEmail = {
    // required: "이메일을 입력해 주세요",
  };

  const userOldPassword = {
    // required: "비밀번호를 입력해 주세요",
    minLength: {
      value: 6,
      message: "최소 6자리 이상입니다",
    },
  };

  const userNewPassword = {
    // required: "비밀번호를 입력해 주세요",
    minLength: {
      value: 6,
      message: "최소 6자리 이상입니다",
    },
  };
  const userNewPassword2 = {
    // required: "비밀번호를 입력해 주세요",
    minLength: {
      value: 6,
      message: "최소 6자리 이상입니다",
    },
  };
  return (
    <>
      <Helmet>
        <title>Edit User</title>
      </Helmet>
      {userData ? (
        <div className="login_box">
          <h1>회원정보 수정</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              placeholder={userData.name}
              {...register("name", userName)}
            />
            {errors?.name && (
              <div style={{ marginTop: 7, color: "red", fontWeight: 600 }}>
                <span>{(errors.name as any).message}</span>
              </div>
            )}

            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              placeholder={userData.email}
              {...register("email", userEmail)}
            />
            {errors?.email && (
              <div style={{ marginTop: 7, color: "red", fontWeight: 600 }}>
                <span>{(errors.email as any).message}</span>
              </div>
            )}

            <label htmlFor="oldPassword">기존 비밀반호</label>
            <input
              type="password"
              id="oldPassword"
              autoComplete="off"
              placeholder="비밀번호를 입력하세요."
              {...register("oldPassword", userOldPassword)}
            />
            {errors?.oldPassword && (
              <div style={{ marginTop: 7, color: "red", fontWeight: 600 }}>
                <span>{(errors.oldPassword as any).message}</span>
              </div>
            )}

            <label htmlFor="newPassword">새로운 비밀번호</label>
            <input
              type="password"
              id="newPassword"
              autoComplete="off"
              placeholder="비밀번호를 입력하세요."
              {...register("newPassword", userNewPassword)}
            />
            {errors?.newPassword && (
              <div style={{ marginTop: 7, color: "red", fontWeight: 600 }}>
                <span>{(errors.newPassword as any).message}</span>
              </div>
            )}

            <label htmlFor="newPassword2">새로운 비밀번호 확인</label>
            <input
              type="password"
              id="newPassword2"
              autoComplete="off"
              placeholder="비밀번호를 입력하세요."
              {...register("newPassword2", userNewPassword2)}
            />
            {errors?.newPassword2 && (
              <div style={{ marginTop: 7, color: "red", fontWeight: 600 }}>
                <span>{(errors.newPassword2 as any).message}</span>
              </div>
            )}

            <div className="login_btn">
              <button type="submit">회원정보 수정하기</button>
              {error && <span>{error?.errorMessage}</span>}
            </div>
            <p>빈칸 미 입력시 기존값으로 대체됨</p>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default EdituserProfile;
