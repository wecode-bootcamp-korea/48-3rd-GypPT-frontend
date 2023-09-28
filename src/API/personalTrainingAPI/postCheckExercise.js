const postCheckExercise = async (checkedBox, formattedDate) => {
  try {
    await fetch('http://10.58.52.105:3000/custom/checkExercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: localStorage.getItem('authorization'),
      },
      body: JSON.stringify({
        id: checkedBox.id,
        checked: Number(checkedBox.checked),
        selectedDate: formattedDate,
      }),
    });
  } catch (err) {
    console.error(err);
    alert('데이터 불러오기 실패');
  }
};

export default postCheckExercise;
