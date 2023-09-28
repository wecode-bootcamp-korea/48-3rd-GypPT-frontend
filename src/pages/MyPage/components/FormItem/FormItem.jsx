import React from 'react';
import Input from '../Input/Input';

function FormItem({
  className,
  infoName,
  name,
  isDisabled,
  type,
  value,
  handleInputChange,
  defaultValue,
}) {
  return (
    <div className={`formItem ${className}`}>
      <span>{infoName}</span>
      <Input
        type={type}
        handleInputChange={handleInputChange}
        value={value}
        name={name}
        defaultValue={defaultValue}
        disabled={isDisabled}
      />
    </div>
  );
}

export default FormItem;
