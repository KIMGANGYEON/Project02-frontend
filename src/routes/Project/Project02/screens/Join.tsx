import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface error {
  errorMessage: string;
}

interface sendData {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const Join = () => {
  const [error, setError] = useState<error>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<sendData>({ mode: "onChange" });

  const getAuth = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}user/join`,
        { withCredentials: true }
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate("/project02");
      }
    }
  };

  const onSubmit: SubmitHandler<sendData> = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}user/join`,
        data,
        { withCredentials: true }
      );
      if (response.status === 201) {
        reset();
        toast.success("회원가입이 완료되었습니다");
        navigate("/project02/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
      }
    }
  };

  const userName = {
    required: "이름을 입력해 주세요",
  };

  const userEmail = {
    required: "이메일을 입력해 주세요",
  };

  const userPassword = {
    required: "비밀번호를 입력해 주세요",
    minLength: {
      value: 6,
      message: "최소 6자리 이상입니다",
    },
  };
  const userPassword2 = {
    required: "비밀번호를 입력해 주세요",
    minLength: {
      value: 6,
      message: "최소 6자리 이상입니다",
    },
  };

  useEffect(() => {
    getAuth();
  }, []);
  return (
    <>
      <Helmet>
        <title>Join</title>
      </Helmet>
      <div className="login_box">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            placeholder="이름을 입력하세요."
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
            placeholder="이메일을 입력하세요."
            {...register("email", userEmail)}
          />
          {errors?.email && (
            <div style={{ marginTop: 7, color: "red", fontWeight: 600 }}>
              <span>{(errors.email as any).message}</span>
            </div>
          )}

          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            placeholder="비밀번호를 입력하세요."
            {...register("password", userPassword)}
          />
          {errors?.password && (
            <div style={{ marginTop: 7, color: "red", fontWeight: 600 }}>
              <span>{(errors.password as any).message}</span>
            </div>
          )}

          <label htmlFor="password2">비밀번호 확인</label>
          <input
            type="password"
            id="password2"
            autoComplete="off"
            placeholder="비밀번호를 입력하세요."
            {...register("password2", userPassword2)}
          />
          {errors?.password2 && (
            <div style={{ marginTop: 7, color: "red", fontWeight: 600 }}>
              <span>{(errors.password2 as any).message}</span>
            </div>
          )}

          <div className="login_btn">
            <button type="submit">회원가입 하기</button>
            {error && <span>{error?.errorMessage}</span>}
          </div>
          <p>
            아이디가 있으면 <a href="/project02/login">로그인</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Join;
