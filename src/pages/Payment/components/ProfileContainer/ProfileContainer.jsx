import React from 'react';
import './ProfileContainer.scss';

const ProfileContainer = ({ data }) => {
  return (
    <div className="profileContainer">
      <div className="imgBox">
        {data.profileImage && (
          <img
            src={data.profileImage}
            className="profileImage"
            alt="profileIMG"
          />
        )}
      </div>
      <div className="profileTextWrap">
        <div className="imogeAndNickName">
          <div className="imoge">{data.imoge}</div>
          <div className="nickName">{data.nickName}</div>
        </div>
        <ProfileContent data={data} />
      </div>
    </div>
  );
};
export default ProfileContainer;

const PROFILE_CONTENT_TITLE = [
  { title: 'LICENSE', keyText: 'license' },
  { title: 'CAREER', keyText: 'career' },
  { title: 'AWARDS', keyText: 'awards' },
];

const ProfileContent = ({ data }) => (
  <>
    {PROFILE_CONTENT_TITLE.map((text, index) => (
      <div key={index}>
        <div className="titleText">{text.title}</div>
        {data[text.keyText].map((text, subIndex) => (
          <div className="contentText" key={subIndex}>
            {text}
          </div>
        ))}
      </div>
    ))}
  </>
);
