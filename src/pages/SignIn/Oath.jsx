import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { REST_API_KEY, REDIRECT_URI_SECOND } from './kakaoLoginData';

const Oath = () => {
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI_SECOND}&response_type=code`;
  const code = new URL(window.location.href).searchParams.get('code');
  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const goToKakaoSignUp = () => {
    window.location.href = KAKAO_AUTH_URI;
  };

  const checkNewbie = () => {
    fetch(`${apiUrl}/users/kakao-sign-in?code=${code}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(response => response.json())
      .then(result => {
        if (
          result.message ===
            'BASIC REGISTRATION SUCCESSFUL. NEED ADDITIONAL INFORMATION' ||
          result.message === 'NEED ADDITIONAL INFORMATION'
        ) {
          alert('추가정보 입력이 필요합니다!');
          goToKakaoSignUp();
        } else if (result.message === 'SIGN IN COMPLETED') {
          localStorage.setItem('authorization', result.authorization);
          navigate('/community');
        } else {
          alert('error');
        }
      });
  };

  useEffect(() => {
    checkNewbie();
  }, []);

  return (
    <div
      className="spinnerContainer"
      style={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RotatingLines
        strokeColor="#ff7a00"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default Oath;
