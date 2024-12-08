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
const closeFormDOMElement = document.querySelector('.error__inner');
const textHastagsDOMElement = form.querySelector('.text__hashtags');
const textDescriptionDOMElement = form.querySelector('.text__description');


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

const registerCloseEventListeners = () => {
  if (closeFormDOMElement) {
    closeFormDOMElement.addEventListener('click', () => {
      clickCloseForm();
    });
  }
  document.addEventListener('keydown', (evt) => {
    if (
      (evt.key === 'Escape' &&
        (document.activeElement === textHastagsDOMElement ||
          document.activeElement === textDescriptionDOMElement)) ||
      document.querySelector('.error')
    ) {
      evt.stopPropagation();
    } else if (evt.key === 'Escape') {
      clickCloseForm();
    }
  });
};

const closeOnClickSuccess = (evt) => {
  if (successElement && !successElement.contains(evt.target)) {
    clickCloseForm();
  }
};

const closeOnEscSuccess = (evt) => {
  if ((evt.key === 'Escape' || evt.keyCode === 27) && successElement) {
    evt.stopPropagation();
    clickCloseForm();
    registerCloseEventListeners();
  }
};

const closeEventListenersSuccess = () => {
  const closeSuccessFormBtn = successElement.querySelector('.success__button');
  if (closeSuccessFormBtn) {
    closeSuccessFormBtn.addEventListener('click', clickCloseForm);
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

  const closeButton = errorElement.querySelector('.error__button');
  if (closeButton) {
    closeButton.addEventListener('click', closeErrorForm);
  }

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

    fetch('ывывhttps://32.javascript.htmlacademy.pro/kekstagram', {
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
          hashtags: form.querySelector('.text__hashtags').value,
          description: form.querySelector('.text__description').value,
        });
      });
  });
};

const closeOnEscError = (evt) => {
  if ((evt.key === 'Escape' || evt.keyCode === 27) && errorElement) {
    evt.stopPropagation();
    errorElement.remove();
    errorElement = null;
    document.removeEventListener('keydown', closeOnEscError);
  }
};

const closeEventListenersError = () => {
  document.addEventListener('keydown', closeOnEscError);
  body.addEventListener('click', closeOnEscError);
};

if (errorElement) {
  closeEventListenersError();
}

export { getData, sendingData };
