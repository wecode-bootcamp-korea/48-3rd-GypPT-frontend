import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VscChevronLeft } from 'react-icons/vsc';
import './PostNav.scss';

const PostNav = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className="postNav">
      <div className="icon">
        <VscChevronLeft onClick={() => navigate(-1)} />
      </div>
      <div className="text">{text && <span>{text}</span>}</div>
    </div>
  );
};

export default PostNav;
