

const bigPicture = document.querySelector('.big-picture');
const closeBigPicture = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentsList = bigPicture.querySelector('.social__comments');
const dataGenerationComments = document.querySelector('.social__comment-total-count');
const loadMoreButton = document.querySelector('.comments-loader');
const commentShown = document.querySelector('.social__comment-shown-count');
const COMMENTS_COUNT = 5;
let pictureItems;
let photoData;
let loadMoreButtonClickListener;
const bigImage = bigPicture.querySelector('img');
const dataGenerationDescription = bigPicture.querySelector('.social__header .social__caption');
const dataGenerationLikes = bigPicture.querySelector('.social__header .likes-count');


const renderBigPicture = function (photo) {
  bigImage.src = photo.url;
  dataGenerationDescription.textContent = photo.description;
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

const hideExcessComments = function () {
  const loadMoreComments = document.querySelectorAll('.social__comment');

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
};

const loadMoreCommentsHandler = function () {
  const loadMoreComments = document.querySelectorAll('.social__comment');
  let commentsDisplayed = COMMENTS_COUNT;

  loadMoreButtonClickListener = () => {
    const hiddenComments = document.querySelectorAll('.social__comment.hidden');
    for (let i = 0; i < COMMENTS_COUNT && i < hiddenComments.length; i++) {
      hiddenComments[i].classList.remove('hidden');
    }
    commentsDisplayed += Math.min(COMMENTS_COUNT, hiddenComments.length);
    commentShown.textContent = commentsDisplayed;

    if (commentsDisplayed >= loadMoreComments.length) {
      loadMoreButton.classList.add('hidden');
    }
  };

  loadMoreButton.addEventListener('click', loadMoreButtonClickListener);
};

const removeLoadMoreCommentsHandler = function () {
  loadMoreButton.removeEventListener('click', loadMoreButtonClickListener);
};


const handleLoadMoreComments = function () {
  hideExcessComments();
  loadMoreCommentsHandler();
};


const openBigPictureModal = function () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeBigPictureModal = function () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  removeLoadMoreCommentsHandler();
};

const addEventListeners = function () {
  pictureItems.forEach((pictureItem, index) => {
    pictureItem.addEventListener('click', () => {
      const photo = photoData[index];
      renderBigPicture(photo);
      handleLoadMoreComments();
      openBigPictureModal();
    });
  });
};

const addCloseEventListeners = function () {
  closeBigPicture.addEventListener('click', () => {
    closeBigPictureModal();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      closeBigPictureModal();
      removeLoadMoreCommentsHandler();
    }
  });
};

const showPhoto = function (data) {
  photoData = data;
  pictureItems = document.querySelectorAll('.picture');
  addEventListeners();
  addCloseEventListeners();
};

export { showPhoto, openBigPictureModal, closeBigPictureModal };
