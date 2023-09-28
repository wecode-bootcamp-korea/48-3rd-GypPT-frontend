import React from 'react';

function Input({ placeholder = null, handleInputChange = null, ...rest }) {
  return (
    <input placeholder={placeholder} onChange={handleInputChange} {...rest} />
  );
}

export default Input;
