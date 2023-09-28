import React from 'react';
import './DaysUntilStart.scss';

const DaysUntilStart = ({ startYearMonthDate, nowYearMonthDate }) => {
  const getDateDiff = (d1, d2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    const diffDate = date1.getTime() - date2.getTime();

    return parseInt(Math.abs(diffDate / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="daysUntilStart">
      <img
        src="/images/fitness.PNG"
        className="daysUntilStartImage"
        alt="daysUntilStartImage"
      />
      <div className="textWrap">
        <div className="daysUntilStartTitle">
          {getDateDiff(startYearMonthDate, nowYearMonthDate)}일 후 운동이
          시작됩니다
        </div>
        <div className="daysUntilStartSub">
          그동안 가벼운 스트레칭을 <br /> 하고 계시는 것은 어떤가요?
        </div>
      </div>
    </div>
  );
};

export default DaysUntilStart;
