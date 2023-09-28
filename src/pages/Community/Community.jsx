import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityNav from './components/CommunityNav';
import CommunityList from './components/CommunityList';
import CommunityWriteButton from './components/CommunityWriteButton';
import ContentTab from '../../components/ContentTab/ContentTab';
import CommunityPagination from './components/CommunityPagination';
import { BASE_API_URL } from '../../config';
import './Community.scss';

const CONTENT_TAP_DATA = [
  {
    id: 1,
    text: '전체',
  },
  { id: 2, text: '자유' },
  {
    id: 3,
    text: '🎖️ 피트니스 코칭',
  },
];

const Community = () => {
  const [communityData, setCommunityData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handlerTab = num => setSelectedTab(num);
  const navigate = useNavigate();

  const handlePost = () => {
    const authorization = localStorage.getItem('authorization');

    let mappedTabId = selectedTab;

    if (selectedTab === 1 || selectedTab === 2) {
      mappedTabId = 1;
    } else if (selectedTab === 3) {
      mappedTabId = 2;
    }

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

        if (myGrade === 'bronze' && mappedTabId === 2) {
          const isConfirmed = window.confirm(
            '해당 게시물을 보려면 결제가 필요합니다. 결제 페이지로 이동하시겠습니까?',
          );

          if (isConfirmed) {
            navigate('/payment');
          }
          return;
        } else {
          navigate(`/community/post?tabId=${mappedTabId}`);
        }
      })
      .catch(error => {
        console.error('Error fetching user grade:', error);
      });
  };

  useEffect(() => {
    const getCommunityData = () => {
      // fetch('http://10.58.52.105:3000/community/posts/all', {
      fetch(`${BASE_API_URL}/community/posts/all`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: localStorage.getItem('authorization'),
        },
      })
        .then(response => response.json())
        .then(data => setCommunityData(data.data));
    };

    getCommunityData();
  }, []);

  const filteredData = communityData.filter(item => {
    if (selectedTab === 1) {
      return item.category === 1 || item.category === 2;
    }
    if (selectedTab === 2) {
      return item.category === 1;
    }
    if (selectedTab === 3) {
      return item.category === 2;
    }
    return false;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div>
      <CommunityNav />
      <ContentTab
        selectedTab={selectedTab}
        handlerTab={handlerTab}
        CONTENT_TAP_DATA={CONTENT_TAP_DATA}
      />

      <CommunityList
        filteredData={filteredData}
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
      <CommunityPagination
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
      <CommunityWriteButton onClick={handlePost} />
    </div>
  );
};

export default Community;
