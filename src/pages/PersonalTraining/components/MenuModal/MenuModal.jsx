import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiImageSquareThin, PiFolderLight } from 'react-icons/pi';
import { BsLink45Deg } from 'react-icons/bs';
import { SlArrowRight } from 'react-icons/sl';
import { RxExit } from 'react-icons/rx';
import './MenuModal.scss';

const MenuModal = ({
  deleteChattingPost,
  setClickedMenu,
  clickedMenu,
  chattingData,
}) => {
  const ref = useRef();
  const navigate = useNavigate();
  const handleCloseMenuModal = e => {
    if (clickedMenu && (!ref.current || !ref.current.contains(e.target)))
      setClickedMenu(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleCloseMenuModal);
    return () => {
      document.removeEventListener('mousedown', handleCloseMenuModal);
    };
  }, []);

  return (
    <div className="menuModal" ref={ref}>
      <div className="title">상담방 서랍</div>
      <div className="subTitle">
        <div className="wrap">
          <PiImageSquareThin />
          <div>사진/동영상</div>
        </div>
        <SlArrowRight className="arrow" />
      </div>
      <div className="subTitle">
        <div className="wrap">
          <PiFolderLight />
          <div>파일</div>
        </div>
        <SlArrowRight className="arrow" />
      </div>
      <div className="subTitle">
        <div className="wrap">
          <BsLink45Deg />
          <div> 링크</div>
        </div>
        <SlArrowRight className="arrow" />
      </div>
      <div className="title">톡캘린더</div>
      <div className="title">톡게시판</div>
      <div className="title">대화상대</div>
      <div className="modalBottom">
        <div
          className="exitBox"
          onClick={() => {
            const deleteData = async () => {
              await deleteChattingPost(chattingData);
              navigate('/personal-training');
            };
            deleteData();
          }}
        >
          <RxExit className="deleteButton" />
          <div className="exitText">상담방 나가기</div>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
