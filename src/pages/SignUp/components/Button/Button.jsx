import React from 'react';
import './Button.scss';

export default function Button({
  className,
  text,
  onClickFunction,
  validation = true,
  isDoubleChecked = null,
}) {
  return (
    <div className={isDoubleChecked ? 'checked' : className}>
      <button onClick={onClickFunction} disabled={!validation}>
        {text}
      </button>
    </div>
  );
}
