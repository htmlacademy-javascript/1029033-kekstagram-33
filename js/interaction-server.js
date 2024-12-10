import { addingPhoto } from './photo-generation.js';
import { showPhoto } from './big-picture.js';
import { showFilter, changeFilterButton } from './filter.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorLoadingTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
let successModalElement;
let errorModalElement;

function closeModal(modalElement) {
  if (modalElement) {
    modalElement.remove();
    modalElement = null;
  }
  document.removeEventListener('keydown', onEscKeydown);
  body.removeEventListener('click', onClickOutside);
}

function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    if (successModalElement) {
      closeModal(successModalElement);
    }
    if (errorModalElement) {
      closeModal(errorModalElement);
    }
  }
}

function onClickOutside(evt) {
  if (successModalElement && !evt.target.closest('.success__inner')) {
    closeModal(successModalElement);
  }
  if (errorModalElement && !evt.target.closest('.error__inner')) {
    closeModal(errorModalElement);
  }
}

function additionSuccessForm() {
  successModalElement = successTemplate.cloneNode(true);
  body.appendChild(successModalElement);

  const closeSuccessForm = () => closeModal(successModalElement);

  const closeButton = successModalElement.querySelector('.success__button');
  if (closeButton) {
    closeButton.addEventListener('click', closeSuccessForm);
  }

  document.removeEventListener('keydown', onEscKeydown);
  body.removeEventListener('click', onClickOutside);

  document.addEventListener('keydown', onEscKeydown);
  body.addEventListener('click', onClickOutside);
}

function additionErrorForm(formData) {
  errorModalElement = errorTemplate.cloneNode(true);
  body.appendChild(errorModalElement);

  const closeErrorForm = () => closeModal(errorModalElement);

  const closeButton = errorModalElement.querySelector('.error__button');
  if (closeButton) {
    closeButton.addEventListener('click', closeErrorForm);
  }

  document.removeEventListener('keydown', onEscKeydown);
  body.removeEventListener('click', onClickOutside);

  document.addEventListener('keydown', onEscKeydown);
  body.addEventListener('click', onClickOutside);

  uploadForm.querySelector('.text__hashtags').value = formData.hashtags;
  uploadForm.querySelector('.text__description').value = formData.description;
}

function openErrorLoadingForm() {
  const errorLoadingElement = errorLoadingTemplate.cloneNode(true);
  body.appendChild(errorLoadingElement);

  setTimeout(() => errorLoadingElement.remove(), 5000);
}

function getData() {
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка сети');
      }
      return response.json();
    })
    .then((data) => {
      const container = document.querySelector('.pictures');
      container.querySelectorAll('.picture').forEach((photo) => photo.remove());
      addingPhoto(data);
      showPhoto(data);
      showFilter();
      changeFilterButton();
    })
    .catch(openErrorLoadingForm);
}

function sendingData(onSuccess) {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    fetch('https://32.javascript.htmlacademy.pro/kekstagram', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка сервера');
        }
        return response.json();
      })
      .then(() => {
        onSuccess();
        additionSuccessForm();
      })
      .catch(() => {
        additionErrorForm({
          hashtags: uploadForm.querySelector('.text__hashtags').value,
          description: uploadForm.querySelector('.text__description').value,
        });
      });
  });
}

export { getData, sendingData };
