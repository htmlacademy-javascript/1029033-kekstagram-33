import { addingPhoto } from './photo-generation.js';
import { showPhoto } from './big-picture.js';
import { showFilter, changeFilterButton } from './filter.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorLoadingTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const filterDefaultDOMElement = document.getElementById('filter-default');
const filterRandomDOMElement = document.getElementById('filter-random');
const filterDiscussedDOMElement = document.getElementById('filter-discussed');
let successModalElement;
let errorModalElement;
let errorLoadingElement;

const closeOnClickForm = () => {
  if (successModalElement) {
    successModalElement.remove();
    successModalElement = null;
  }
};


const closeOnClickBody = () => {
  const successDOMElement = document.querySelector('.success');
  successDOMElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('success__inner') && !evt.target.classList.contains('success__title')) {
      closeOnClickForm();
    }
  });

  document.removeEventListener('click', closeOnClickBody);
};


const additionSuccessForm = () => {
  successModalElement = successTemplate.cloneNode(true);
  body.appendChild(successModalElement);
  body.addEventListener('click', closeOnClickBody);
};


const closeOnEscSuccess = (evt) => {
  if ((evt.key === 'Escape' || evt.keyCode === 27) && successModalElement) {
    evt.stopPropagation();
    closeOnClickForm();
  }
};

const closeEventListenersSuccess = () => {
  const closeSuccessFormBtn = successModalElement.querySelector('.success__button');
  if (closeSuccessFormBtn) {
    closeSuccessFormBtn.addEventListener('click', closeOnClickForm);
  }
  document.addEventListener('keydown', closeOnEscSuccess);
  body.addEventListener('click', closeOnClickBody);
};

const additionErrorForm = (formData) => {
  errorModalElement = errorTemplate.cloneNode(true);
  body.appendChild(errorModalElement);


  const closeErrorForm = () => {
    if (errorModalElement) {
      errorModalElement.remove();
      errorModalElement = null;
    }
  };

  const closeButton = errorModalElement.querySelector('.error__button');
  if (closeButton) {
    closeButton.addEventListener('click', closeErrorForm);
  }
  const errorDOMElement = document.querySelector('.error');
  errorDOMElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('error__inner') && !evt.target.classList.contains('error__title')) {
      closeErrorForm();
    }
  });


  uploadForm.querySelector('.text__hashtags').value = formData.hashtags;
  uploadForm.querySelector('.text__description').value = formData.description;
};

const openErrorLoadingForm = () => {
  errorLoadingElement = errorLoadingTemplate.cloneNode(true);
  body.appendChild(errorLoadingElement);


  setTimeout(() => {
    if (errorLoadingElement) {
      errorLoadingElement.remove();
      errorLoadingElement = null;
    }
  }, 5000);
};

const getData = () => {
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка сети');
      }
      return response.json();
    })
    .then((data) => {
      const container = document.querySelector('.pictures');
      const photos = container.querySelectorAll('.picture');
      photos.forEach((photo) => photo.remove());

      if (filterDefaultDOMElement.classList.contains('img-filters__button--active')) {
        addingPhoto(data);
      } else if (filterRandomDOMElement.classList.contains('img-filters__button--active')) {
        addingPhoto(data.slice(0, 10));
      } else if (filterDiscussedDOMElement.classList.contains('img-filters__button--active')) {
        const sortedData = data.slice().sort((a, b) => b.comments.length - a.comments.length);
        addingPhoto(sortedData);
      }

      showPhoto(data);
      showFilter();
      changeFilterButton();
    })
    .catch(() => {
      openErrorLoadingForm();
    });
};


const closeOnEscError = (evt) => {
  if ((evt.key === 'Escape' || evt.keyCode === 27) && errorModalElement) {
    evt.stopPropagation();
    errorModalElement.remove();
    errorModalElement = null;
    document.removeEventListener('keydown', closeOnEscError);
  }
};

const closeEventListenersError = () => {
  document.addEventListener('keydown', closeOnEscError);
  body.addEventListener('click', errorModalElement);
};

const sendingData = (onSuccess) => {
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
        closeEventListenersSuccess();
      })
      .catch(() => {
        additionErrorForm({
          hashtags: uploadForm.querySelector('.text__hashtags').value,
          description: uploadForm.querySelector('.text__description').value,

        });
        if (errorModalElement) {
          closeEventListenersError();
        }
      });
  });
};


export { getData, sendingData };
