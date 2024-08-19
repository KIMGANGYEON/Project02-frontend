import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { isAuth } from "../../../../atom";

interface error {
  errorMessage: string;
}

interface sendData {
  email: string;
  password: string;
}

const Login = () => {
  const [error, setError] = useState<error>();
  const [userState, setUserState] = useRecoilState(isAuth);
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
        `${process.env.REACT_APP_BASE_URL}user/login`,
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
        `${process.env.REACT_APP_BASE_URL}user/login`,
        data,
        { withCredentials: true }
      );
      if (response.status === 201) {
        reset();
        setUserState({ isLoggedIn: true });
        toast.success("로그인에 성공하셨습니다");
        navigate("/project02");
        window.location.reload();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
      }
    }
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

  useEffect(() => {
    getAuth();
  }, []);
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="login_box">
        <h1>로그인</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="login_btn">
            <button type="submit">로그인 하기</button>
            {error && <span>{error?.errorMessage}</span>}
          </div>
          <p>
            아이디가 없으면 <a href="/project02/join">회원가입</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
