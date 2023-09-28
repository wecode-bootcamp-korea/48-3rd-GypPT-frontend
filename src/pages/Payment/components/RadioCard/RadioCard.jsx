import React from 'react';
import { useNavigate } from 'react-router-dom';
import RadioButton from '../RadioButton/RadioButton';
import './RadioCard.scss';

export default function RadioCard({
  membershipData,
  setMembershipSelected,
  membershipSelected,
  trainerId,
}) {
  const { id, name, description, price } = membershipData;

  const changeNameKor = name => {
    if (name === 'silver') {
      return '실버';
    } else {
      return '골드';
    }
  };

  const navigate = useNavigate();

  const getSelectedData = e => {
    e.preventDefault();

    if (!trainerId) {
      alert('트레이너와의 상담을 먼저 진행해주세요!');
      if (
        window.confirm('트레이너 리스트로 이동하려면 확인 버튼을 눌러주세요!')
      ) {
        navigate('/personal-training');
      } else {
        return;
      }
    }
    setMembershipSelected(id);
  };
  return (
    <label
      className={`${
        membershipSelected === id ? 'selected' : 'nonSelected'
      } radioItem`}
      onClick={getSelectedData}
    >
      <RadioButton
        id={id}
        membershipName={name}
        membershipSelected={membershipSelected}
        setMembershipSelected={setMembershipSelected}
        getSelectedData={getSelectedData}
      />
      <div className="membershipInfo">
        <div className="titleInfo">
          <span>{changeNameKor(name)} 맴버쉽</span>
          <span>{description}</span>
        </div>
        <div className="detailInfo">
          <span>{price}원</span>
          <span>every month</span>
        </div>
      </div>
    </label>
  );
}
