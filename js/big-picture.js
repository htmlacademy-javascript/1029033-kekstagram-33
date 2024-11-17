import {dataGeneration} from './data.js';

const showPhoto = function () {
  const bigPicture = document.querySelector('.big-picture');
  const closeBigPicture = document.querySelector('.big-picture__cancel');
  const dontScroll = document.querySelector('body');
  const pictureItems = document.querySelectorAll('.picture');
  const photoInformation = dataGeneration();

  const commentsList = bigPicture.querySelector('.social__comments');
  commentsList.innerHTML = '';

  pictureItems.forEach((pictureItem) => {
    pictureItem.addEventListener('click', (evt) => {

      const picture = evt.target.closest('.picture');
      const imageUrl = picture.querySelector('img').src;
      const bigImage = bigPicture.querySelector('img');
      bigImage.src = imageUrl;

      const photoIndex = Array.from(pictureItems).indexOf(pictureItem);
      const photoData = photoInformation[photoIndex];
      const dataGenerationBigImage = bigPicture.querySelector('.social__header .social__caption');
      dataGenerationBigImage.textContent = photoData.description;

      const numberLikes = picture.querySelector('.picture__info .picture__likes');
      const numberLikesBigImage = bigPicture.querySelector('.social__header .likes-count');
      numberLikesBigImage.textContent = numberLikes.textContent;

      const numberComments = picture.querySelector('.picture__info .picture__comments');
      const numberCommentsBigImage = bigPicture.querySelector('.social__comment-count .social__comment-total-count');
      numberCommentsBigImage.textContent = numberComments.textContent;

      photoData.comments.forEach((comment) => {
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

  closeBigPicture.onclick = function () {
    bigPicture.classList.add('hidden');
    dontScroll.classList.remove('modal-open');
  };

};
export {showPhoto};


