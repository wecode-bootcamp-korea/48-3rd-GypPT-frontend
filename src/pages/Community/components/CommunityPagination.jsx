import React from 'react';
import './CommunityPagination.scss';

const CommunityPagination = ({ handlePrevPage, handleNextPage }) => {
  return (
    <div className="paginationWrap">
      <button className="pagination" onClick={handlePrevPage}>
        이전
      </button>
      <button className="pagination" onClick={handleNextPage}>
        다음
      </button>
    </div>
  );
};

export default CommunityPagination;
