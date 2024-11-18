import {dataGeneration} from './data.js';
const photoData = dataGeneration();

const showPhoto = function () {
  const bigPicture = document.querySelector('.big-picture');
  const closeBigPicture = document.querySelector('.big-picture__cancel');
  const dontScroll = document.querySelector('body');
  const pictureItems = document.querySelectorAll('.picture');
  const commentsList = bigPicture.querySelector('.social__comments');

  pictureItems.forEach((pictureItem) => {
    pictureItem.addEventListener('click', (evt) => {

      // Очищаем комментарии при каждом открытии нового фото
      commentsList.innerHTML = '';

      // Находим изображение, которое было кликнуто
      const picture = evt.target.closest('.picture');
      const imageUrl = picture.querySelector('img').src;
      const bigImage = bigPicture.querySelector('img');
      bigImage.src = imageUrl;

      // Индекс текущей фотографии в массиве данных
      const photoIndex = Array.from(pictureItems).indexOf(pictureItem);

      // Описание фотографии для модального окна
      const dataGenerationBigImage = bigPicture.querySelector('.social__header .social__caption');
      dataGenerationBigImage.textContent = photoData[photoIndex].description;

      // Лайки
      const numberLikes = picture.querySelector('.picture__info .picture__likes');
      const numberLikesBigImage = bigPicture.querySelector('.social__header .likes-count');
      numberLikesBigImage.textContent = numberLikes.textContent;

      // Количество комментариев на миниатюре
      const numberComments = picture.querySelector('.picture__info .picture__comments').textContent;
      const numberCommentsBigImage = bigPicture.querySelector('.social__comment-count .social__comment-total-count');
      numberCommentsBigImage.textContent = `${numberComments} комментариев`;

      // Получаем нужное количество комментариев из данных (на основе миниатюры)
      const commentsToShow = photoData[photoIndex].comments.slice(0, parseInt(numberComments));

      // Добавляем комментарии в модальное окно
      commentsToShow.forEach((comment) => {
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

      // Показываем модальное окно
      bigPicture.classList.remove('hidden');
      dontScroll.classList.add('modal-open');
    });
  });

  // Закрытие модального окна
  closeBigPicture.onclick = function () {
    bigPicture.classList.add('hidden');
    dontScroll.classList.remove('modal-open');
  };
};


export {showPhoto};


