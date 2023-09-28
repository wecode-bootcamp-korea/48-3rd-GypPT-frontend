const INPUT_DATA = {
  nickname: {
    className: 'nickname',
    infoName: '닉네임',
    type: 'text',
    placeholder: '집피티',
  },
  physicalInfo: [
    {
      id: 1,
      className: 'height',
      infoName: '키',
      type: 'number',
      placeholder: '160',
    },
    {
      id: 2,
      className: 'weight',
      infoName: '몸무게',
      type: 'number',
      placeholder: '60',
    },
  ],
  checkBox: {
    infoName: '개인정보 이용 동의',
    type: 'checkbox',
  },
};

const BUTTON_DATA = {
  doubleCheck: {
    className: 'btnDoubleCheckWrap',
    text: '중복확인',
  },

  submit: {
    className: 'btnSubmitWrap',
    text: '가입하기',
  },
};

export { INPUT_DATA, BUTTON_DATA };
