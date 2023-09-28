import React, { useState } from 'react';
import WeekCalendar from '../WeekCalendar/WeekCalendar';
import MyTraining from '../MyTraining/MyTraining';
import DetailModal from '../../../../components/DetailModal/DetailModal';
import TodayReflection from '../TodayReflection/TodayReflection';
import './PersonalTrainingBox.scss';

const DEFAULT_MODAL_INFO = {
  category: '',
  id: 0,
};

const PersonalTrainingBox = ({
  dateState,
  setDateState,
  makeWeekArr,
  setSelectedDate,
  selectedDate,
  formattedDate,
  trainingData,
  setTrainingData,
}) => {
  const [currentModalInfo, setCurrentModalInfo] = useState(DEFAULT_MODAL_INFO);

  const [clickedMenu, setClickedMenu] = useState(false);

  const { exercise, diet } = trainingData;

  const currentModalData = trainingData[currentModalInfo.category]?.find(
    ({ id }) => id === currentModalInfo.id,
  );

  const TRAINING_DATA = [
    {
      id: 1,
      type: 'exercise',
      title: '나의 운동',
      trainingData: exercise,
      onClickTrainingBox: id =>
        setCurrentModalInfo({ category: 'exercise', id }),
    },
    {
      id: 2,
      type: 'diet',
      title: '나의 식단',
      trainingData: diet,
      onClickTrainingBox: id => setCurrentModalInfo({ category: 'diet', id }),
    },
  ];

  return (
    <div className="personalTrainingBox">
      {currentModalData && <div className="modalOverlay" />}
      <WeekCalendar
        dateState={dateState}
        setDateState={setDateState}
        makeWeekArr={makeWeekArr}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {TRAINING_DATA.map(data => (
        <MyTraining
          type={data.type}
          key={data.id}
          trainingData={data.trainingData}
          title={data.title}
          onClickTrainingBox={id => data.onClickTrainingBox(id)}
          formattedDate={formattedDate}
          setTrainingData={setTrainingData}
        />
      ))}

      {currentModalData && (
        <DetailModal
          id={currentModalData.id}
          name={currentModalData.name}
          imageUrl={currentModalData.imageUrl}
          content={currentModalData.description}
          currentModalData={currentModalData}
          clickedMenu={clickedMenu}
          setClickedMenu={setClickedMenu}
          closeModal={() => setCurrentModalInfo(DEFAULT_MODAL_INFO)}
        />
      )}
      <TodayReflection />
    </div>
  );
};

export default PersonalTrainingBox;
