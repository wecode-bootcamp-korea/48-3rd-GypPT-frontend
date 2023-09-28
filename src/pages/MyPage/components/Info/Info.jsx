import React from 'react';

function Info({ className, infoName, userdata, measure }) {
  return (
    <div className={`info ${className}`}>
      <span>{infoName}</span>
      <div className="infoBox">
        {userdata}
        {measure}
      </div>
    </div>
  );
}

export default Info;
