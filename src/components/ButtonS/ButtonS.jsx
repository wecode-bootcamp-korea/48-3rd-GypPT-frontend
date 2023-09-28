import React from 'react';
import './ButtonS.scss';

const ButtonS = ({ text, onClick }) => {
  return (
    <button className="buttonS" onClick={onClick}>
      {text}
    </button>
  );
};

export default ButtonS;
