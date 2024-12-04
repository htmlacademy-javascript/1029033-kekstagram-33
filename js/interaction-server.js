import {addingPhoto} from './photo-generation.js';
import {showPhoto} from './big-picture.js';
import {showFilter, filterClick} from './filter.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
let successElement;
let errorElement;
const filterDefault = document.getElementById('filter-default');
const filterRandom = document.getElementById('filter-random');
const filterDiscussed = document.getElementById('filter-discussed');
const cleaning = document.querySelector('.picture');


const additionSuccessForm = () => {
  successElement = successTemplate.cloneNode(true);
  body.appendChild(successElement);
};

const clickCloseForm = () => {
  if (successElement) {
    successElement.remove();
    successElement = null;
  }
};

const closeOnClick = (evt) => {
  if (successElement && !successElement.contains(evt.target)) {
    clickCloseForm();
  }
};

const closeOnEsc = (evt) => {
  if (evt.keyCode === 27) {
    clickCloseForm();
  }
};

const closeEventListeners = () => {
  const closeSuccessForm = successElement.querySelector('.success__button');
  if (closeSuccessForm) {
    closeSuccessForm.addEventListener('click', () => {
      clickCloseForm();
    });
  }

  document.addEventListener('keydown', closeOnEsc);
  body.addEventListener('click', closeOnClick);
};

//ERROR

const additionErorForm = () => {
  errorElement = errorTemplate.cloneNode(true);
  body.appendChild(errorElement);
};

const clickCloseErrorForm = () => {
  if (errorElement) {
    errorElement.remove();
    errorElement = null;
  }
};

const closeOnClickError = (evt) => {
  if (errorElement && !errorElement.contains(evt.target)) {
    clickCloseErrorForm();
  }
};

const closeOnEscError = (evt) => {
  if (evt.keyCode === 27) {
    clickCloseErrorForm();
  }
};

const closeEventListenersError = () => {
  const closeErrorForm = errorElement.querySelector('.error__button');
  if (closeErrorForm) {
    closeErrorForm.addEventListener('click', () => {
      clickCloseErrorForm();
    });
  }
  document.addEventListener('keydown', closeOnEscError);
  body.addEventListener('click', closeOnClickError);
};


const getData = () => {
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector('.pictures');
      const photos = container.querySelectorAll('.picture');
      photos.forEach((photo) => photo.remove());
      if (filterDefault.classList.contains('img-filters__button--active')) {
        addingPhoto(data); // Показать все фотографии
      } else if (filterRandom.classList.contains('img-filters__button--active')) {
        addingPhoto(data.slice(0, 10)); // Показать 10 случайных фотографий
      } else if (filterDiscussed.classList.contains('img-filters__button--active')) {
        const sortedData = data.slice().sort((a, b) => b.comments.length - a.comments.length); // Отсортировать по обсуждаемости
        addingPhoto(sortedData); // Показать наиболее обсуждаемые фотографии
      }
      showPhoto(data);
      showFilter();
      filterClick();
    });
};

const sendingData = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch('https://32.javascript.htmlacademy.pro/kekstagram', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject('Ошибка на сервере');
        }
        return response.json();
      })
      .then(() => {
        onSuccess();
        additionSuccessForm();
        closeEventListeners();
      })
      .catch((error) => {
        console.log(error);
        additionErorForm();
        closeEventListenersError();
      });
  });
};

export { getData, sendingData, closeEventListeners };
