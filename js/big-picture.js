const updateBigPicture = function (photo, bigPicture, commentsList, dataGenerationComments) {
  const bigImage = bigPicture.querySelector('img');
  bigImage.src = photo.url;

  const dataGenerationDescription = bigPicture.querySelector('.social__header .social__caption');
  dataGenerationDescription.textContent = photo.description;

  const dataGenerationLikes = bigPicture.querySelector('.social__header .likes-count');
  dataGenerationLikes.textContent = photo.likes;

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
};

const handleLoadMoreComments = function (COMMENTS_COUNT) {
  const loadMoreComments = document.querySelectorAll('.social__comment');
  const loadMoreButton = document.querySelector('.comments-loader');
  const commentShown = document.querySelector('.social__comment-shown-count');

  if (loadMoreComments.length > COMMENTS_COUNT) {
    for (let i = COMMENTS_COUNT; i < loadMoreComments.length; i++) {
      loadMoreComments[i].classList.add('hidden');
    }
    loadMoreButton.classList.remove('hidden');
    commentShown.textContent = COMMENTS_COUNT;
  } else {
    loadMoreButton.classList.add('hidden');
    commentShown.textContent = loadMoreComments.length;
  }

  let commentsDisplayed = COMMENTS_COUNT;

  loadMoreButton.addEventListener('click', () => {
    const hiddenComments = document.querySelectorAll('.social__comment.hidden');
    for (let i = 0; i < COMMENTS_COUNT && i < hiddenComments.length; i++) {
      hiddenComments[i].classList.remove('hidden');
    }
    commentsDisplayed += Math.min(COMMENTS_COUNT, hiddenComments.length);
    commentShown.textContent = commentsDisplayed;

    if (commentsDisplayed >= loadMoreComments.length) {
      loadMoreButton.classList.add('hidden');
    }
  });
};

const openBigPictureModal = function (bigPicture, body) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeBigPictureModal = function (bigPicture, body) {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

const addEventListeners = function (pictureItems, bigPicture, photoData, commentsList, dataGenerationComments, body, COMMENTS_COUNT) {
  pictureItems.forEach((pictureItem, index) => {
    pictureItem.addEventListener('click', () => {
      const photo = photoData[index];
      updateBigPicture(photo, bigPicture, commentsList, dataGenerationComments);
      handleLoadMoreComments(COMMENTS_COUNT);
      openBigPictureModal(bigPicture, body);
    });
  });
};

const addCloseEventListeners = function (closeBigPicture, bigPicture, body) {
  closeBigPicture.addEventListener('click', () => {
    closeBigPictureModal(bigPicture, body);
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      closeBigPictureModal(bigPicture, body);
    }
  });
};

const showPhoto = function (photoData) {
  const bigPicture = document.querySelector('.big-picture');
  const closeBigPicture = document.querySelector('.big-picture__cancel');
  const body = document.querySelector('body');
  const pictureItems = document.querySelectorAll('.picture');
  const commentsList = bigPicture.querySelector('.social__comments');
  const dataGenerationComments = document.querySelector('.social__comment-total-count');
  const COMMENTS_COUNT = 5;

  addEventListeners(pictureItems, bigPicture, photoData, commentsList, dataGenerationComments, body, COMMENTS_COUNT);
  addCloseEventListeners(closeBigPicture, bigPicture, body);
};

export { showPhoto };
