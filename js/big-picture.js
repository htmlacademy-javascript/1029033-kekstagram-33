
const showPhoto = function (photoData) {
  const bigPicture = document.querySelector('.big-picture');
  const closeBigPicture = document.querySelector('.big-picture__cancel');
  const dontScroll = document.querySelector('body');
  const pictureItems = document.querySelectorAll('.picture');
  const commentsList = bigPicture.querySelector('.social__comments');
  const dataGenerationComments = document.querySelector('.social__comment-total-count');

  pictureItems.forEach((pictureItem) => {
    pictureItem.addEventListener('click', (evt) => {
      const picture = evt.target.closest('.picture');
      const imageUrl = picture.querySelector('img').src;
      const bigImage = bigPicture.querySelector('img');
      bigImage.src = imageUrl;

      const photoDescription = picture.querySelector('img').alt;
      const dataGenerationDescription = bigPicture.querySelector('.social__header .social__caption');
      dataGenerationDescription.textContent = photoDescription;

      const photoLikes = picture.querySelector('.picture__likes');
      const dataGenerationLikes = bigPicture.querySelector('.social__header .likes-count');
      dataGenerationLikes.textContent = photoLikes.textContent;

      const photoIndex = Array.from(pictureItems).indexOf(pictureItem);
      const photo = photoData[photoIndex];
      console.log(photo);
      commentsList.innerHTML = '';
      dataGenerationComments.textContent = photo.comments.length;

      photo.comments.forEach((comment) => {
        const commentElement = document.createElement('li');
        commentElement.classList.add('social__comment');

        const commentAvatar = document.createElement('img');
        commentAvatar.classList.add('social__picture');
        commentAvatar.src = comment.avatar;
        commentAvatar.alt = comment.name;
        commentAvatar.width = 35;
        commentAvatar.height = 35;

        const commentText = document.createElement('p');
        commentText.classList.add('social__text');
        commentText.textContent = comment.message;

        commentElement.appendChild(commentAvatar);
        commentElement.appendChild(commentText);

        commentsList.appendChild(commentElement);
      });

      bigPicture.classList.remove('hidden');
      dontScroll.classList.add('modal-open');
    });
  });


  closeBigPicture.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    dontScroll.classList.remove('modal-open');
  });

  closeBigPicture.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      bigPicture.classList.add('hidden');
    }
  });


};


export {showPhoto};
