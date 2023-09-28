import React from 'react';
import './CommunityWriteButton.scss';

const CommunityWriteButton = ({ onClick }) => {
  return (
    <div className="CommunityWriteButton">
      <button className="button" onClick={onClick}>
        글쓰기
      </button>
    </div>
  );
};

export default CommunityWriteButton;
