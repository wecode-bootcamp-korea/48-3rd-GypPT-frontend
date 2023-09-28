import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WriteHeader from './components/WriteHeader/WriteHeader';
import InputWrap from './components/InputWrap/InputWrap';
import MenuModal from './components/MenuModal/MenuModal';
import postPostContent from '../../API/personalTrainingAPI/postPostContent';
import './WriteCounsel.scss';

const WriteCounsel = () => {
  const navigate = useNavigate();
  const param = useParams();

  const [content, setContent] = useState('');
  const [clickedMenu, setClickedMenu] = useState(false);

  const trainerId = param.id;
  const emojiName = param.emojiName;
  const nickName = param.nickName;

  const handleContent = value => {
    setContent(value);
  };

  const onClickPostSend = () => {
    const getData = async () => {
      await postPostContent(content, trainerId);
      navigate(`/personal-training/counsel/chatting/${trainerId}`);
    };
    getData();
  };

  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      onClickPostSend();
    }
  };

  const deleteChattingPost = () => {
    navigate('/personal-training');
  };

  return (
    <div className="writeCounsel">
      {clickedMenu && <div className="modalOverlay" />}
      <WriteHeader
        emojiName={emojiName}
        nickName={nickName}
        setClickedMenu={setClickedMenu}
      />
      <div className="counselConversationBox scroll">
        {clickedMenu && (
          <MenuModal
            deleteChattingPost={deleteChattingPost}
            clickedMenu={clickedMenu}
            setClickedMenu={setClickedMenu}
          />
        )}
      </div>
      <InputWrap
        handleContent={handleContent}
        content={content}
        onClickSend={onClickPostSend}
        handleOnKeyPress={handleOnKeyPress}
      />
    </div>
  );
};

export default WriteCounsel;
