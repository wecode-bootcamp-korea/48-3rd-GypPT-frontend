const postPostContent = async (content, trainerId) => {
  try {
    await fetch('http://10.58.52.105:3000/consultant/posts/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: localStorage.getItem('authorization'),
      },

      body: JSON.stringify({
        content: content,
        trainerId: Number(trainerId),
      }),
    });
  } catch (err) {
    console.error(err);
    alert('데이터 불러오기 실패');
  }
};

export default postPostContent;
