import React from 'react';
import Input from '../Input/Input';

function FormItem({ className, infoName, type, placeholder, getFucntion }) {
  return (
    <div className={`formItem ${className}`}>
      <span>{infoName}</span>
      <Input
        name={className}
        type={type}
        placeholder={placeholder}
        getFucntion={getFucntion}
      />
    </div>
  );
}

export default FormItem;
