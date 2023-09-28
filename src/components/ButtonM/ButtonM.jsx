import React from 'react';
import './ButtonM.scss';

const ButtonM = ({ firstText, secondText, className, onClick }) => {
  return (
    <button className={`buttonM ${className}`} onClick={onClick}>
      {firstText}
      <br />
      {secondText}
    </button>
  );
};

export default ButtonM;
