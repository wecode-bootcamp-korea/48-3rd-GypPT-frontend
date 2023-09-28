import React from 'react';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';
import { FcEditImage } from 'react-icons/fc';
import './CheckBox.scss';

const CheckBox = ({
  id,
  type,
  name,
  imageUrl,
  onClickTrainingBox,
  checked,
  setCheckBoxData,
  checkedBox,
}) => {
  return (
    <div className="checkBoxWrap ">
      <div className="checkBox">
        <div className="imgAndTextWrap" onClick={() => onClickTrainingBox(id)}>
          <div className="imgBox">
            {imageUrl ? (
              <img
                src={`${imageUrl}`}
                className="exerciseImg"
                alt="exerciseIMG"
              />
            ) : (
              <FcEditImage className="noImageIcon" />
            )}
          </div>
          <div className="textBox">
            <div className="title">{name}</div>
          </div>
        </div>
        {checked ? (
          <BsCheckCircleFill
            className="checkedOn"
            onClick={() =>
              setCheckBoxData({ ...checkedBox, checked: false, id, type })
            }
          />
        ) : (
          <BsCheckCircle
            className="checkedOff"
            onClick={() =>
              setCheckBoxData({ ...checkedBox, checked: true, id, type })
            }
          />
        )}
      </div>
    </div>
  );
};

export default CheckBox;
