import React, { useState, useEffect } from 'react';
import { BASE_API_URL } from '../../../config';
import './PostUser.scss';

const PostUser = ({ comments, getPostDetailData }) => {
  const [content, setContent] = useState('');
  const [postUserData, setPostUserData] = useState([]);
  const [nickname, setNickname] = useState('');
  const [userGrade, setUserGrade] = useState('');

  const getGradeEmoji = grade => {
    switch (grade) {
      case 'bronze':
        return '🥉';
      case 'silver':
        return '🥈';
      case 'gold':
        return '🥇';
      default:
        return '';
    }
  };

  useEffect(() => {
    // fetch('http://10.58.52.105:3000/users/mypage', {
    fetch(`${BASE_API_URL}/users/mypage`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: localStorage.getItem('authorization'),
      },
    })
      .then(res => res.json())
      .then(result => {
        setNickname(result.myPageData?.nickname);
        setUserGrade(result.myPageData?.grade);
      })
      .catch(error =>
        console.error('데이터를 불러오는 데 실패했습니다.', error),
      );
  }, []);

  const handleInput = value => {
    setContent(value);
  };

  const formatDateToYYYYMMDD = date => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    return `${yyyy}.${mm}.${dd}`;
  };
  const handlePostComment = () => {
    const newComment = {
      content,
      nickname,
      userGrade,
      commentId: Date.now(),
      commentTime: formatDateToYYYYMMDD(new Date()),
    };

    setPostUserData([newComment, ...postUserData]);
    setContent('');
  };

  return (
    <div className="PostUser">
      <div className="inputWrap">
        <input
          onChange={event => handleInput(event.target.value)}
          className="input"
          type="text"
          value={content}
        />
        <button
          className="button"
          onClick={handlePostComment}
          disabled={content.length === 0}
        >
          댓글게시
        </button>
      </div>

      {postUserData &&
        postUserData.map(item => (
          <div key={item.commentId} className="userBox">
            <div className="userDetail">
              <span className="user">
                {' '}
                {getGradeEmoji(item.userGrade)}
                {item.nickname}
              </span>
              <div className="actions">
                <span className="time">{item.commentTime}</span>
              </div>
            </div>
            <div>{item.content}</div>
          </div>
        ))}

      {comments &&
        comments.map(item => (
          <div key={item.commentId} className="userBox">
            <div className="userDetail">
              <span className="user">
                🥉
                {item.nickname}
              </span>
              <div className="actions">
                <span className="time">{item.commentTime}</span>
              </div>
            </div>
            <div>{item.content}</div>
          </div>
        ))}
    </div>
  );
};

export default PostUser;
