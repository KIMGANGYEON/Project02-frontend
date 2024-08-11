import React from "react";
import { Helmet } from "react-helmet";
import { useForm, SubmitHandler } from "react-hook-form";

interface sendData {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const Join = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<sendData>({ mode: "onChange" });

  const onSubmit: SubmitHandler<sendData> = (data) => {
    console.log(data);
  };

  const userName = {
    required: "이메일을 입력해 주세요",
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
            placeholder="비밀번호를 입력하세요."
            {...register("password2", userPassword2)}
          />
          {errors?.password2 && (
            <div style={{ marginTop: 7, color: "red", fontWeight: 600 }}>
              <span>{(errors.password2 as any).message}</span>
            </div>
          )}

          <div className="login_btn">
            <button type="submit">로그인 하기</button>
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
