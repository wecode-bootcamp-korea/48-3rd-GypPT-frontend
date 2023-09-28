import React from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { PiSmileyLight } from 'react-icons/pi';
import { HiHashtag } from 'react-icons/hi2';
import './InputWrap.scss';

const InputWrap = ({
  handleContent,
  content,
  onClickSend,
  handleOnKeyPress,
}) => {
  return (
    <div className="inputContainer">
      <div className="inputWrap">
        <BsPlusLg className="plusIcon" />
        <input
          onChange={event => handleContent(event.target.value)}
          type="text"
          value={content}
          className="textarea"
          placeholder="궁금한 점을 물어보세요"
          onKeyDown={e => handleOnKeyPress(e)}
        />
        <PiSmileyLight className="smileIcon" />
        <HiHashtag className="hashIcon" />
        <button onClick={() => onClickSend()} className="sendButton">
          전송
        </button>
      </div>
    </div>
  );
};
export default InputWrap;
