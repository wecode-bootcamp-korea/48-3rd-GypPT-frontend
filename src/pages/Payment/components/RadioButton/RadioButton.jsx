import React from 'react';
import './RadioButton.scss';

export default function RadioButton({
  id,
  membershipName,
  membershipSelected,
}) {
  return (
    <div class="radio-buttons-1">
      <label for={membershipName} class="radio-button">
        <input
          type="radio"
          name="membership"
          checked={id === membershipSelected}
        />
        <span class="custom-radio" />
      </label>
    </div>
  );
}
