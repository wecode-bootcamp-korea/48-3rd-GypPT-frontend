import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonM from '../../components/ButtonM/ButtonM';
import getConsultListData from '../../API/personalTrainingAPI/getConsultListData';
import './CounselList.scss';

const CounselList = () => {
  const navigate = useNavigate();
  const [consultList, setConsultList] = useState([]);

  const onClickmatchingButton = trainerId =>
    navigate(`/payment/${trainerId}?type=${'gold'}`);

  useEffect(() => {
    const getData = async () => {
      const { result } = await getConsultListData();
      setConsultList(result.message);
    };

    getData();
  }, []);

  return (
    <div className="counselList">
      {consultList?.map(data => (
        <ChatTrainerBox
          key={data.postId}
          postId={data.postId}
          trainerImage={data.trainerProfileImage}
          trainerNickname={data.trainerNickname}
          emojiName={data.emojiName}
          content={data.content}
          createdDate={data.createdAt}
          onClickmatchingButton={() => onClickmatchingButton(data.trainerId)}
          trainerId={data.trainerId}
        />
      ))}
    </div>
  );
};

export default CounselList;

const ChatTrainerBox = ({
  trainerId,
  trainerImage,
  trainerNickname,
  emojiName,
  content,
  onClickmatchingButton,
}) => {
  const navigate = useNavigate();
  const onClickChattingPage = () =>
    navigate(`/personal-training/counsel/chatting/${trainerId}`);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <div className="chatTrainerBox">
      <div className="trainerImage">
        <img src={`${trainerImage}`} alt="profileImage" />
      </div>
      <div className="rightWrap" onClick={() => onClickChattingPage()}>
        <div className="trainerTextInfo">
          <div className="traineremoji">
            {emojiName == 'trainer' && '💪'}
            {emojiName == 'ironman' && '🦾'}
          </div>
          <div className="trainerNickname">{trainerNickname}</div>
        </div>
        <div className="content">{truncate(content, 32)}</div>
      </div>
      <ButtonM
        firstText="1:1"
        secondText="매칭하기"
        onClick={() => onClickmatchingButton(trainerId)}
      />
    </div>
  );
};
