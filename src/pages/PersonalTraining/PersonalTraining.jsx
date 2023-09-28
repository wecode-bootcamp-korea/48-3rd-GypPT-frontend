import React, { useEffect, useState, useRef } from 'react';
import { BeatLoader } from 'react-spinners';
import ContentTab from '../../components/ContentTab/ContentTab';
import ProfileListBox from './components/ProfileListBox/ProfileListBox';
import PersonalTrainingBox from './components/PersonalTrainingBox/PersonalTrainingBox';
import DaysUntilStart from './components/DaysUntilStart/DaysUntilStart';
import SelectStartDate from './components/SelectStartDate/SelectStartDate';
import getMyExerciseAndDiet from '../../API/personalTrainingAPI/getMyExerciseAndDiet';
import CounselList from './CounselList';
import getTrainerProfile from '../../API/personalTrainingAPI/getTrainerProfile';
import './PersonalTraining.scss';
import 'react-calendar/dist/Calendar.css';

const PersonalTraining = () => {
  const pageEnd = useRef();
  const [membershipData, setMembershipData] = useState({});
  const startDate = new Date(`${membershipData[0]?.startDate}`);
  //TODO refactor
  const startYearMonthDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
  );

  const nowDate = new Date();

  const nowYearMonthDate = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate(),
  );
  const [ptStartDate, setPtStartDate] = useState('');
  const week = makeWeekArr(nowYearMonthDate);
  const [selectedDate, setSelectedDate] = useState(`${nowYearMonthDate}`);
  const [selectedTab, setSelectedTab] = useState(1);
  const [trainerData, setTrainerData] = useState([]);
  const [dateState, setDateState] = useState({
    date: nowYearMonthDate,
    week: week,
  });
  const [selectedButton, setSelectedButton] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(true);
  const [page, setPage] = useState(1);

  const [trainingData, setTrainingData] = useState({
    exercise: [],
    diet: [],
  });

  const loadMore = () => {
    setPage(prev => prev + 1);
  };
  const year = new Date(selectedDate).getFullYear().toString();
  const month = (new Date(selectedDate).getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const day = new Date(selectedDate).getDate().toString();

  const formattedDate = year + '-' + month + '-' + day;

  const handlerTab = num => {
    if (num === 2) {
      if (localStorage.getItem('authorization')) {
        if (membershipData[0]?.membershipName === 'gold') {
          setSelectedTab(num);
        } else {
          alert('멤버쉽 가입을 해주세요');
        }
      } else {
        alert('로그인을 해주세요');
      }
    }
    if (num === 3) {
      if (localStorage.getItem('authorization') !== null) {
        if (membershipData[0]?.length !== '') {
          setSelectedTab(num);
        } else {
          alert('상담한 이력이 없습니다');
        }
      } else {
        alert('로그인을 해주세요');
      }
    }
    if (num === 1) {
      setSelectedTab(num);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const { result } = await getMyExerciseAndDiet(formattedDate);

      setTrainingData({ exercise: result.exercise, diet: result.diet });
      setMembershipData(result.membership);
    };

    getData();
  }, [formattedDate]);

  useEffect(() => {
    const getData = async () => {
      const { result } = await getTrainerProfile(page);
      setTrainerData(prevTrainerData => [...prevTrainerData, ...result.data]);
      setLoading(true);

      if (result.data.length !== 0) {
        setLoadingImg(true);
      } else {
        setLoadingImg(false);
      }
    };
    getData();
  }, [page]);

  useEffect(() => {
    if (!ptStartDate) {
      setSelectedButton(true);
    } else {
      setSelectedButton(false);
    }
  }, [ptStartDate]);

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 },
      );
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  return (
    <div className="personalTraining">
      <div className="mainTop">
        <div className="title">맞춤운동</div>
      </div>
      <ContentTab
        selectedTab={selectedTab}
        handlerTab={handlerTab}
        CONTENT_TAP_DATA={CONTENT_TAP_DATA}
      />
      {selectedTab === 1 && (
        <div>
          <ProfileListBox trainerData={trainerData} />
          {loadingImg && (
            <div ref={pageEnd} className="loadingImg">
              <BeatLoader color="#ff7a00" />
            </div>
          )}
        </div>
      )}
      {selectedTab === 2 &&
        (startYearMonthDate <= nowYearMonthDate ? (
          <PersonalTrainingBox
            dateState={dateState}
            setDateState={setDateState}
            makeWeekArr={makeWeekArr}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            formattedDate={formattedDate}
            setTrainingData={setTrainingData}
            trainingData={trainingData}
          />
        ) : membershipData[0].startDate !== null ? (
          <DaysUntilStart
            startYearMonthDate={startYearMonthDate}
            nowYearMonthDate={nowYearMonthDate}
          />
        ) : (
          <SelectStartDate
            setPtStartDate={setPtStartDate}
            ptStartDate={ptStartDate}
            selectedButton={selectedButton}
          />
        ))}
      {selectedTab === 3 && <CounselList />}
    </div>
  );
};

export default PersonalTraining;

const makeWeekArr = date => {
  const day = date.getDay();
  const week = [];
  for (let i = 0; i < 7; i++) {
    const newDate = new Date(date.valueOf() + 86400000 * (i - day));
    week.push([i, newDate]);
  }
  return week;
};

const CONTENT_TAP_DATA = [
  {
    id: 1,
    text: '트레이너',
  },
  {
    id: 2,
    text: '맞춤 운동',
  },
  {
    id: 3,
    text: '상담 리스트',
  },
];
