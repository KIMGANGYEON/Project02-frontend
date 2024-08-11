import React from "react";
import { Helmet } from "react-helmet";
import { useForm, SubmitHandler } from "react-hook-form";

interface sendData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<sendData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<sendData> = (data) => {
    console.log(data);
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
