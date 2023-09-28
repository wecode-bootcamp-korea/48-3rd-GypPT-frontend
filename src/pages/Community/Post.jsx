import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PostNav from './components/PostNav';
import ContentTab from '../../components/ContentTab/ContentTab';
import { BASE_API_URL } from '../../config';
import './Post.scss';

const Post = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [nickname, setNickname] = useState('');
  const [userGrade, setUserGrade] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [communityData, setCommunityData] = useState([]);
  const tabId = Number(searchParams.get('tabId') || 1);
  const [previewSrc, setPreviewSrc] = useState(null);

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

  const handlerTab = id => {
    // if (userGrade === 'bronze' && id === 2) {
    //   const isConfirmed = window.confirm(
    //     '코칭을 받고 싶으시면 결제부터 하십시오. 결제 페이지로 이동하시겠습니까?',
    //   );
    //   if (isConfirmed) {
    //     navigate('/payment');
    //     return;
    //   } else {
    //     return;
    //   }
    // }
    searchParams.set('tabId', id);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const getPostUser = () => {
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
          setNickname(result.myPageData.nickname);
          setUserGrade(result.myPageData.grade);
        })
        .catch(error =>
          console.error('데이터를 불러오는 데 실패했습니다.', error),
        );
    };

    getPostUser();
  }, []);

  const handleFileChange = e => {
    setSelectedFile(e.target.files[0]);
    setPreviewSrc(URL.createObjectURL(e.target.files[0]));
  };

  const handlePostAdd = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', tabId);
    if (selectedFile) {
      formData.append('selectedFile', selectedFile);
    }
    fetch(`${BASE_API_URL}/community/posts/upload`, {
      // fetch('http://10.58.52.105:3000/community/posts/upload', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('authorization'),
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setCommunityData(prevData => [data, ...prevData]);
        navigate(`/community/postdetail/${data.id}`);
        console.log(data.id);
      });
  };
  const handlePostcancel = () => {
    navigate('/community');
  };

  return (
    <div className="Post">
      <PostNav text="글작성" />
      <ContentTab
        selectedTab={tabId}
        handlerTab={handlerTab}
        CONTENT_TAP_DATA={CONTENT_TAP_DATA}
      />
      <div className="textWrap">
        <span className="user">
          {getMedalEmoji(userGrade)} {nickname}
        </span>
        <div className="previewWrap">
          {previewSrc && (
            <img src={previewSrc} alt="preview" className="previewImage" />
          )}
          <label className="customFileInput">
            사진 추가
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>
      <div className="inputWrap">
        <input
          onChange={event => setTitle(event.target.value)}
          type="text"
          value={title}
          className="input"
          placeholder="제목을 입력해주세요"
        />
        <textarea
          onChange={event => setContent(event.target.value)}
          type="textarea"
          value={content}
          className="textarea"
          placeholder="게시글을 입력해주세요"
        />
      </div>
      <div className="buttonWrap">
        <button onClick={handlePostcancel} className="cancel">
          취소
        </button>
        <button onClick={handlePostAdd} className="add">
          게시
        </button>
      </div>
    </div>
  );
};
export default Post;
const CONTENT_TAP_DATA = [
  {
    id: 1,
    text: '자유',
  },
  { id: 2, text: '피트니스 코칭' },
];
