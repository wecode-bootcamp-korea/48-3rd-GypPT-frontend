import React from 'react';
import { useNavigate } from 'react-router-dom';
import { REST_API_KEY, REDIRECT_URI } from './kakaoLoginData';
import './SignIn.scss';

const SignIn = () => {
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const goToKakaoSignIn = () => {
    window.location.href = KAKAO_AUTH_URI;
  };

  return (
    <div className="signInContainer">
      <div className="logo">
        <img src="/images/fitness.png" alt="집피티" />
        <h1>GypPT</h1>
      </div>
      <button className="loginButton" onClick={goToKakaoSignIn}>
        <img src="/images/KaKao.svg" alt="카카오" />
        <span>카카오 로그인</span>
      </button>
    </div>
  );
};

export default SignIn;
