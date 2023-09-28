import React from 'react';
import './Input.scss';

function Input({ name, type, placeholder, getFucntion }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={getFucntion}
    />
  );
}

export default Input;
