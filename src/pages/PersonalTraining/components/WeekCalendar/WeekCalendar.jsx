import React from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { SlArrowRight } from 'react-icons/sl';
import './WeekCalendar.scss';

const WeekCalendar = ({
  dateState,
  setDateState,
  makeWeekArr,
  setSelectedDate,
  selectedDate,
}) => {
  const engWeek = ['SU', 'MO', 'TH', 'WE', 'TE', 'FR', 'SA'];

  const dateOnClick = date => setSelectedDate(date);
  const onPressArrowLeft = () => {
    const newDate = new Date(dateState.date.valueOf() - 86400000 * 7);
    const newWeek = makeWeekArr(newDate);
    setDateState({ date: newDate, week: newWeek });
  };

  const onPressArrowRight = () => {
    const newDate = new Date(dateState.date.valueOf() + 86400000 * 7);
    const newWeek = makeWeekArr(newDate);
    setDateState({
      date: newDate,
      week: newWeek,
    });
  };
  const getWeek = date => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();

    return Math.ceil((currentDate + firstDay) / 7);
  };

  return (
    <div className="weekCalendarBox">
      <div className="monthWeekText">
        <SlArrowLeft className="arrowLeft" onClick={() => onPressArrowLeft()} />
        <div>{dateState.date.getMonth() + 1}월</div>
        <div>{getWeek(new Date(dateState.date))}주차</div>
        <SlArrowRight
          className="arrowRight"
          onClick={() => onPressArrowRight()}
        />
      </div>
      <div className="arrowButtonAndDateBox">
        {dateState.week.map(([index, date]) => (
          <div
            className={`dateBox ${selectedDate == date && 'on'}`}
            key={index}
            onClick={() => dateOnClick(date)}
          >
            <div className="engWeek">{engWeek[date.getDay()]}</div>
            <div className="date">{date.getDate()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekCalendar;
