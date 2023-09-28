import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Button from './components/Button/Button';
import ProfileContainer from './components/ProfileContainer/ProfileContainer';
import RadioCard from './components/RadioCard/RadioCard';
import './Payment.scss';

const Payment = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [searchParams, setSearchParams] = useSearchParams();
  let membershipType = searchParams.get('type');

  if (membershipType === 'silver') {
    membershipType = 2;
  } else if (membershipType === 'gold') {
    membershipType = 3;
  }

  let defaultMembership = 2;

  if (membershipType) {
    defaultMembership = membershipType;
  }

  const { trainerId } = useParams();
  const [membershipSelected, setMembershipSelected] =
    useState(defaultMembership);
  const [membershipData, setMembershipData] = useState([]);

  const [trainerData, setTrainerData] = useState(null);

  const getTrainerData = () => {
    fetch(
      `${apiUrl}/payments/trainer-information`,
      // '/data/trainerData.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: localStorage.getItem('authorization'),
        },
        body: JSON.stringify({
          trainerId: Number(trainerId),
        }),
      },
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`HTTP 오류! 상태 코드: ${res.status}`);
        }
      })
      .then(result => {
        if (result && result.trainerData) {
          setTrainerData(result?.trainerData);
        } else {
          throw new Error('데이터가 유효하지 않습니다.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const getMembershipData = () => {
    fetch(
      `${apiUrl}/payments/membership-list`,
      // '/data/membershipData.json',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: localStorage.getItem('authorization'),
        },
      },
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`HTTP 오류! 상태 코드: ${res.status}`);
        }
      })
      .then(result => {
        if (result && result.membershipData) {
          setMembershipData(result.membershipData);
        } else {
          throw new Error('데이터가 유효하지 않습니다.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const payment = () => {
    fetch(`${apiUrl}/payments/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: localStorage.getItem('authorization'),
      },
      body: JSON.stringify({
        membershipId: membershipSelected,
        trainerId: trainerId,
        paymentsMethodId: 1,
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.message === 'Payment completed') {
          alert('결제가 완료되었습니다!');
          localStorage.setItem('authorization', result.authorization);
        } else if (result.message === 'Payment Error') {
          alert('잠시후 다시 시도해주세요.😓');
        } else if (result.message === 'Insufficient balance') {
          alert('포인트 잔액이 부족합니다.😓');
        } else if (result.message === 'Already in use') {
          alert('이미 해당 멤버쉽을 이용중입니다!');
        } else if (result.message === 'dataSource Error') {
          alert('404 에러');
        }
      });
  };

  useEffect(() => {
    getMembershipData();

    if (trainerId === undefined) {
      return;
    } else {
      getTrainerData();
    }
  }, []);

  return (
    <div className="paymentWrap">
      <div className="paymentContainer">
        <div className="header">
          <h2>
            가입할 맴버쉽을 <br />
            골라주세요!
          </h2>
        </div>
        <div className="radioList">
          {membershipData?.length > 0 &&
            membershipData.map((membershipData, id) => {
              return (
                <RadioCard
                  key={id}
                  setMembershipSelected={setMembershipSelected}
                  membershipData={membershipData}
                  membershipSelected={membershipSelected}
                  trainerId={trainerId}
                />
              );
            })}
        </div>

        {membershipData.length > 0 && (
          <div className="getInfoContent">
            <h3>You'll get:</h3>
            {membershipSelected === 2 ? (
              <div className="description">
                <img src="/images/StarFilled.svg" alt="별" />
                <span>{membershipData[0]?.benefit}</span>
              </div>
            ) : (
              membershipSelected === 3 &&
              membershipData[1]?.benefit.map((info, num) => (
                <div className="description" key={num}>
                  <img src="/images/StarFilled.svg" alt="별" />
                  <span>{info}</span>
                </div>
              ))
            )}
          </div>
        )}

        {trainerData && membershipSelected === 3 && (
          <div className="selectedTrainer">
            <h3>선택한 트레이너</h3>
            <ProfileContainer data={trainerData} />
          </div>
        )}

        <Button
          className="paymentButton"
          onClickFunction={payment}
          text="결제하기"
        />
      </div>
    </div>
  );
};

export default Payment;
