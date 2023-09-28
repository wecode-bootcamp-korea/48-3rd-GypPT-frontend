import React from 'react';
import './PostDetailBox.scss';

const PostDetailBox = ({ postDetailData }) => {
  const getMedalEmoji = name => {
    if (!name) {
      return '비회원';
    }
    switch (name) {
      case 'gold':
        return '🥇';
      case 'silver':
        return '🥈';
      case 'bronze':
        return '🥉';
      default:
        return '비회원';
    }
  };
  const getCategoryLabel = category => {
    switch (category) {
      case 1:
        return '자유';
      case 2:
        return '코칭';
      default:
        return '기타';
    }
  };

  return (
    <div className="PostDetailBox">
      <div className="userBox">
        <span className="userName">{`${getMedalEmoji(
          postDetailData.memberGrades,
        )} ${postDetailData.nickname}`}</span>
        <button
          className={`button ${
            postDetailData.category === 2 ? 'coaching' : 'free'
          }`}
        >
          {getCategoryLabel(postDetailData.category)}
        </button>
      </div>
      <div className="textbox">
        <div className="title">{postDetailData.title}</div>
        <div className="text">{postDetailData.content}</div>
        {postDetailData.imageUrl && (
          <img className="image" src={postDetailData.imageUrl} alt="Detail" />
        )}
        <div className="commentBox">
          <span className="comment">
            {postDetailData.comments?.length
              ? `${postDetailData.comments.length}개`
              : ''}
          </span>
          <span className="time">{postDetailData.time}</span>
        </div>
      </div>
    </div>
  );
};

export default PostDetailBox;
