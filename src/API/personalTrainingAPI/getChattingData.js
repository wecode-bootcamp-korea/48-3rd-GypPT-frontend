import { API_BASE_URL } from '../../constants/api';

const getChattingData = async trainerId => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/consultant/posts?trainerProfileId=${trainerId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: localStorage.getItem('authorization'),
        },
      },
    );
    const result = await response.json();
    return { result };
  } catch (err) {
    console.error(err);
    alert('데이터 불러오기 실패');
  }
};

export default getChattingData;
