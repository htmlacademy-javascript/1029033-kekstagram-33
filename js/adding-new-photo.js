const body = document.querySelector('body');
const openForm = document.querySelector('.img-upload__overlay.hidden');
const uploadInput = document.getElementById('upload-file');
const closeForm = document.getElementById('upload-cancel');
const uploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');


const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
};


const clickOpenForm = function () {
  uploadInput.addEventListener('change', () => {
    openForm.classList.remove('hidden');
    body.classList.add('modal-open');
  });
};

const clickCloseForm = function () {
  openForm.classList.add('hidden');
  body.classList.remove('modal-open');
};

const closeEventListeners = function () {
  closeForm.addEventListener('click', () => {
    clickCloseForm();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      clickCloseForm();
    }
  });
};

const pristine = new Pristine(uploadForm, pristineConfig, false);


export {clickOpenForm, clickCloseForm, closeEventListeners};
