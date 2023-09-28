import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostNav from './components/PostNav';
import PostDetailBox from './components/PostDetailBox';
import PostUser from './components/PostUser';
import PostTrainer from './components/PostTrainer';
import { BASE_API_URL } from '../../config';
import './PostDetail.scss';

const PostDetail = () => {
  const [postDetailData, setPostDetailData] = useState({});
  const params = useParams();
  const postId = params.id;

  const getPostDetailData = () => {
    // fetch(`http://10.58.52.105:3000/community/posts/${postId}`, {
    fetch(`${BASE_API_URL}/community/posts/${postId}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: localStorage.getItem('authorization'),
      },
    })
      .then(response => response.json())
      .then(result => {
        setPostDetailData(result.data[0]);
      });
  };

  useEffect(() => {
    getPostDetailData();
  }, [postId]);

  return (
    <>
      <PostNav text="" />
      <div className="postDetail">
        <div className="container">
          <PostDetailBox postDetailData={postDetailData} />
          {postDetailData?.category && (
            <>
              {postDetailData.category === 1 && (
                <PostUser
                  comments={postDetailData.comments}
                  getPostDetailData={getPostDetailData}
                />
              )}
              {postDetailData.category === 2 && (
                <PostTrainer
                  trainerComments={postDetailData.comments}
                  getPostDetailData={getPostDetailData}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
