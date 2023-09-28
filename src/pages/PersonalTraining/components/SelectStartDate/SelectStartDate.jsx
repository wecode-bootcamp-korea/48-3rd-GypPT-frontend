import React from 'react';
import Calendar from 'react-calendar';
import 'moment/locale/ko';
import moment from 'moment';
import postSelectedStartDate from '../../../../API/personalTrainingAPI/postSelectedStartDate';
import './SelectStartDate.scss';

const SelectStartDate = ({ setPtStartDate, ptStartDate, selectedButton }) => {
  const selectedStartDate =
    ptStartDate && moment(ptStartDate).format('YYYY-MM-DD');

  return (
    <div className="selectStartDate">
      <div className="calendarTitle">운동 시작 날짜를 선택해주세요</div>
      <Calendar
        onChange={setPtStartDate}
        value={ptStartDate}
        className="calendar"
        formatDay={(locale, date) =>
          date.toLocaleString('en', { day: 'numeric' })
        }
        next2Label={null}
        prev2Label={null}
      />
      {ptStartDate && (
        <button
          disabled={selectedButton}
          className="seletedDateBox"
          onClick={() => postSelectedStartDate(selectedStartDate)}
        >
          {ptStartDate && moment(ptStartDate).format('MM')}월
          {ptStartDate && moment(ptStartDate).format('DD')}일 (
          {ptStartDate && moment(ptStartDate).format('dddd').slice(0, 1)}) 선택
        </button>
      )}
    </div>
  );
};

export default SelectStartDate;
