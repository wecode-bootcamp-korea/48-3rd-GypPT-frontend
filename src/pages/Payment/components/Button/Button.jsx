import React from 'react';
import './Button.scss';

export default function Button({ className, text, onClickFunction }) {
  return (
    <div className={className}>
      <button onClick={onClickFunction}>{text}</button>
    </div>
  );
}
