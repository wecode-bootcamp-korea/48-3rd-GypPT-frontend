const postDietImage = (ImgRef, id) => {
  const selectedFile = ImgRef.current.files[0];
  if (!selectedFile) {
    alert('사진을 선택하세요');
    return;
  }

  const formData = new FormData();
  formData.append('selectedFile', selectedFile);

  fetch(`http://10.58.52.224:3000/custom/diet-image?dietId=${id}`, {
    method: 'POST',
    headers: {
      authorization: localStorage.getItem('authorization'),
    },

    body: formData,
  });
};

export default postDietImage;
