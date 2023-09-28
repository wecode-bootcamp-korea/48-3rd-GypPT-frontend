const deleteChattingPost = async chattingData => {
  try {
    const response = await fetch(
      `http://10.58.52.105:3000/consultant/posts/${chattingData[0].threadId}`,
      {
        method: 'DELETE',
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

export default deleteChattingPost;
