import React from 'react';
import './PostTrainer.scss';

const PostTrainer = ({ trainerComments }) => {
  return (
    <div className="PostTrainer">
      <div className="answer">A</div>
      {trainerComments &&
        trainerComments.map(item => (
          <div className="commentWrap" key={item.commentId}>
            <div className="commentBox">
              <span className="trainer">{`💪 ${item.nickname}`}</span>
              <span className="time">{item.commentTime}</span>
            </div>
            <div className="content">{item.content}</div>
          </div>
        ))}
    </div>
  );
};
export default PostTrainer;
