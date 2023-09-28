import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../../../config';
import './CommunityList.scss';

const CommunityList = ({
  filteredData,
  currentPage,
  handleNextPage,
  handlePrevPage,
}) => {
  const getMedalEmoji = name => {
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
  const itemsPerPage = 7;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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
  const navigate = useNavigate();

  const handlePostDetail = (id, category) => {
    const authorization = localStorage.getItem('authorization');

    if (!authorization) {
      const proceedToSignIn = window.confirm(
        '로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?',
      );

      if (proceedToSignIn) {
        navigate('/sign-in');
      }
      return;
    }

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
        const myGrade = result.myPageData?.grade;

        if (myGrade === 'bronze' && category === 2) {
          const isConfirmed = window.confirm(
            '해당 게시물을 보려면 결제가 필요합니다. 결제 페이지로 이동하시겠습니까?',
          );

          if (isConfirmed) {
            navigate('/payment');
          }
          return;
        } else {
          navigate(`/community/postdetail/${id}`);
        }
      });
  };

  return (
    <div className="CommunityList">
      {currentItems.map(item => (
        <div
          className="container"
          key={item.threadId}
          onClick={() => handlePostDetail(item.threadId, item.category)}
        >
          <div className="buttonWrap">
            <button
              className={`button ${item.category === 2 ? 'coaching' : 'free'}`}
            >
              {getCategoryLabel(item.category)}
            </button>
            <span className="userName">{`${getMedalEmoji(item.memberGrades)} ${
              item.nickname
            }`}</span>
          </div>
          <div className="titleContainer">
            <div className="titleWrap">
              <div className="title">{item.title}</div>
              <div className="content">{item.content}</div>
            </div>
            {item.imageUrl && (
              <img className="image" src={item.imageUrl} alt="이미지" />
            )}
          </div>
          <div className="comment">
            <span>{item.time}</span>
            <span>{item.comments}개</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityList;
