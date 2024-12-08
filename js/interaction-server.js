import { addingPhoto } from './photo-generation.js';
import { showPhoto } from './big-picture.js';
import { showFilter, filterClick } from './filter.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorLoading = document.querySelector('#data-error').content.querySelector('.data-error');

let successElement;
let errorElement;
let errorLoadingElement;
const filterDefault = document.getElementById('filter-default');
const filterRandom = document.getElementById('filter-random');
const filterDiscussed = document.getElementById('filter-discussed');

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

const closeOnClickSuccess = (evt) => {
  if (successElement && !successElement.contains(evt.target)) {
    clickCloseForm();
  }
};

const closeOnEscSuccess = (evt) => {
  if ((evt.key === 'Escape' || evt.keyCode === 27) && successElement) {
    evt.stopPropagation();
  }
};

const closeEventListenersSuccess = () => {
  const closeSuccessForm = successElement.querySelector('.success__button');
  if (closeSuccessForm) {
    closeSuccessForm.addEventListener('click', clickCloseForm);
  }
  document.addEventListener('keydown', closeOnEscSuccess);
  body.addEventListener('click', closeOnClickSuccess);
};

const additionErrorForm = (formData) => {
  errorElement = errorTemplate.cloneNode(true);
  body.appendChild(errorElement);

  const closeErrorForm = () => {
    if (errorElement) {
      errorElement.remove();
      errorElement = null;
    }
  };

  const closeOnClickError = (evt) => {
    if (errorElement && !errorElement.contains(evt.target)) {
      closeErrorForm();
    }
  };

  const closeOnEscError = (evt) => {
    if ((evt.key === 'Escape' || evt.keyCode === 27) && errorElement) {
      evt.stopPropagation();
      closeErrorForm();
    }
  };

  const closeButton = errorElement.querySelector('.error__button');
  if (closeButton) {
    closeButton.addEventListener('click', closeErrorForm);
  }

  document.addEventListener('keydown', closeOnEscError);
  body.addEventListener('click', closeOnClickError);

  form.querySelector('.text__hashtags').value = formData.hashtags;
  form.querySelector('.text__description').value = formData.description;
};

const errorLoadingForm = () => {
  errorLoadingElement = errorLoading.cloneNode(true);
  body.appendChild(errorLoadingElement);

  setTimeout(() => {
    if (errorLoadingElement) {
      errorLoadingElement.remove();
      errorLoadingElement = null;
    }
  }, 5000);
};

// Data Fetch
const getData = () => {
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector('.pictures');
      const photos = container.querySelectorAll('.picture');
      photos.forEach((photo) => photo.remove());

      if (filterDefault.classList.contains('img-filters__button--active')) {
        addingPhoto(data);
      } else if (filterRandom.classList.contains('img-filters__button--active')) {
        addingPhoto(data.slice(0, 10));
      } else if (filterDiscussed.classList.contains('img-filters__button--active')) {
        const sortedData = data.slice().sort((a, b) => b.comments.length - a.comments.length);
        addingPhoto(sortedData);
      }

      showPhoto(data);
      showFilter();
      filterClick();
    })
    .catch(() => {
      errorLoadingForm();
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
          throw new Error('Server error');
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
          hashtags: form.querySelector('.text__hashtags').value,
          description: form.querySelector('.text__description').value,
        });
      });
  });
};


const formEscHandler = (evt) => {
  if (evt.key === 'Escape' || evt.keyCode === 27) {
    if (errorElement) {
      evt.stopPropagation();
      return;
    }

    if (!successElement) {
      evt.preventDefault();
    }
  }
};

document.addEventListener('keydown', formEscHandler);

export { getData, sendingData };
