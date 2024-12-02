import {addingPhoto} from './photo-generation.js';
import {showPhoto} from './big-picture.js';

const form = document.querySelector('.img-upload__form');

const getData = () => {

  fetch ('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json()).then((data) => {
      addingPhoto(data);
      showPhoto(data);
    });

};

const sendingData = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://32.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body: formData,
      }
    ).then(() => {
      onSuccess();
    });
  });
};


export {getData,sendingData};
