import React, { useState } from 'react';
import ButtonM from '../../../../components/ButtonM/ButtonM';
import './TodayReflection.scss';

const TodayReflection = () => {
  const [reflection, setReflection] = useState('');
  const handleInput = value => {
    setReflection(value);
  };

  return (
    <div className="todayReflection">
      <div className="title">오늘 하루 회고</div>
      <textarea
        className="textarea"
        type="text"
        onChange={event => handleInput(event.target.value)}
        value={reflection}
        placeholder="트레이너에게 궁금한 점 또는 오늘 하루의 컨디션을 공유해주세요"
      />
      <ButtonM firstText="제출" />
    </div>
  );
};

export default TodayReflection;
