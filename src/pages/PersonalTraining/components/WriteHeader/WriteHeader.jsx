import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TfiArrowLeft } from 'react-icons/tfi';
import { GoSearch } from 'react-icons/go';
import { VscMenu } from 'react-icons/vsc';
import './WriteHeader.scss';

const WriteHeader = ({ emojiName, nickName, setClickedMenu }) => {
  const navigate = useNavigate();
  const onClickMenu = () => setClickedMenu(prev => !prev);
  const onClickNavigateback = () => navigate('/personal-training');

  return (
    <div className="writeHeader">
      <div className="infoWrap">
        <TfiArrowLeft
          className="arrowIcon"
          onClick={() => onClickNavigateback()}
        />
        <div className="trainerInfo">
          <div className="trainerEmoji">
            {emojiName == 'trainer' ? '💪' : ''}
          </div>
          <div className="trainerNickname">{nickName}</div>
        </div>
      </div>
      <div className="iconWrap">
        <GoSearch className="searchIcon" />
        <VscMenu className="menuIcon" onClick={() => onClickMenu()} />
      </div>
    </div>
  );
};
export default WriteHeader;
