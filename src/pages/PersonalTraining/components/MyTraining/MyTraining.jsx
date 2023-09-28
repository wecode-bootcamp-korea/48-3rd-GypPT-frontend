import React, { useEffect, useState } from 'react';
import CheckBox from '../CheckBox/CheckBox';
import getMyExerciseAndDiet from '../../../../API/personalTrainingAPI/getMyExerciseAndDiet';
import postCheckDiet from '../../../../API/personalTrainingAPI/postCheckDiet';
import postCheckExercise from '../../../../API/personalTrainingAPI/postCheckExercise';
import './MyTraining.scss';

const MyTraining = ({
  trainingData,
  title,
  onClickTrainingBox,
  type,
  formattedDate,
  setTrainingData,
}) => {
  const [checkedBox, setCheckBoxData] = useState({
    type: '',
    id: 0,
    checked: 0,
    formattedDate,
  });

  useEffect(() => {
    if (checkedBox.type === 'diet') {
      const getData = async () => {
        await postCheckDiet(checkedBox, formattedDate);
      };
      getData();

      const getNewDietData = async () => {
        const { result } = await getMyExerciseAndDiet(formattedDate);

        setTrainingData({ exercise: result.exercise, diet: result.diet });
      };
      getNewDietData();
    }

    if (checkedBox.type === 'exercise') {
      const getData = async () => {
        await postCheckExercise(checkedBox, formattedDate);
      };
      getData();

      const getNewExerciseData = async () => {
        const { result } = await getMyExerciseAndDiet(formattedDate);

        setTrainingData({ exercise: result.exercise, diet: result.diet });
      };
      getNewExerciseData();
    }
  }, [checkedBox]);

  return (
    <div className="myTrainingList">
      <div className="myTrainingTitle">
        <div className="text">{title}</div>
      </div>

      <div className="myTrainingListContent">
        {trainingData?.map(({ id, name, imageUrl, checkbox }) => (
          <CheckBox
            type={type}
            id={id}
            key={id}
            name={name}
            imageUrl={imageUrl}
            checked={checkbox === 1 ? true : false}
            onClickTrainingBox={() => onClickTrainingBox(id)}
            setCheckBoxData={setCheckBoxData}
            checkedBox={checkedBox}
          />
        ))}
      </div>
    </div>
  );
};

export default MyTraining;
