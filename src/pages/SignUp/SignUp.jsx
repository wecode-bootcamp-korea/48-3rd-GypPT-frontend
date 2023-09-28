import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './components/Button/Button';
import FormItem from './components/FormItem/FormItem';
import Input from './components/Input/Input';
import { INPUT_DATA, BUTTON_DATA } from './inputData.js';
import './SignUp.scss';

const SignUp = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const physicalInfoData = INPUT_DATA.physicalInfo;
  const checkBoxData = INPUT_DATA.checkBox;

  const [isDoubleChecked, setIsDoubleChecked] = useState(false);
  const [signupUserInfo, setSignUserInfoData] = useState({
    nickname: '',
    height: 0,
    weight: 0,
  });

  const handleInput = e => {
    const { name, value } = e.target;
    setSignUserInfoData({ ...signupUserInfo, [name]: value });

    if (name === 'nickname') {
      setIsDoubleChecked(false);
    }
  };

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const heightRegex = /^[1-9][0-9]*$/;
  const weightRegex = /^[1-9][0-9]*$/;
  const validation =
    heightRegex.test(signupUserInfo.height) &&
    weightRegex.test(signupUserInfo.weight) &&
    isDoubleChecked &&
    isCheckboxChecked;

  const goToDoubleCheck = () => {
    if (!signupUserInfo.nickname) {
      alert('닉네임을 입력해주세요!');
      return;
    }
    fetch(`${apiUrl}/users/duplicate-nickname`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ nickname: signupUserInfo.nickname }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'AVAILABLE NICKNAME') {
          alert('사용할 수 있는 닉네임입니다!');
          setIsDoubleChecked(true);
        } else if (result.message === 'DUPLICATED NICKNAME') {
          alert('이미 존재하는 닉네임입니다.');
          setIsDoubleChecked(false);
        }
      });
  };

  const signup = () => {
    fetch(`${apiUrl}/users/kakao-sign-up?code=${code}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(signupUserInfo),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'SIGN UP COMPLETED') {
          alert('회원가입 성공!');
          localStorage.setItem('authorization', result.authorization);
          navigate('/community');
        } else {
          alert('회원가입 실패.');
        }
      });
  };

  return (
    <div className="signUpWrap">
      <div className="signUpContainer">
        <div className="header">
          <h2>추가정보를 입력해주세요!</h2>
        </div>
        <div className="formContent">
          <div className="formItem nickname">
            <span>{INPUT_DATA.nickname.infoName}</span>
            <div className="form">
              <Input
                name={INPUT_DATA.nickname.className}
                type={INPUT_DATA.nickname.type}
                placeholder={INPUT_DATA.nickname.placeholder}
                getFucntion={handleInput}
              />
              <Button
                className={BUTTON_DATA.doubleCheck.className}
                onClickFunction={goToDoubleCheck}
                text={BUTTON_DATA.doubleCheck.text}
                isDoubleChecked={isDoubleChecked}
              />
            </div>
          </div>
          <div className="formList">
            {physicalInfoData.map(data => (
              <FormItem
                key={data.id}
                className={data.className}
                infoName={data.infoName}
                type={data.type}
                placeholder={data.placeholder}
                getFucntion={handleInput}
              />
            ))}
          </div>
          <label className="formItem checkBox">
            <input
              type={checkBoxData.type}
              checked={isCheckboxChecked}
              onChange={handleCheckboxChange}
            />
            <span>{checkBoxData.infoName}</span>
          </label>
        </div>
        <Button
          className={BUTTON_DATA.submit.className}
          onClickFunction={signup}
          text={BUTTON_DATA.submit.text}
          validation={validation}
        />
      </div>
    </div>
  );
};

export default SignUp;
