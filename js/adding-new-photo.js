const body = document.querySelector('body');
const openForm = document.querySelector('.img-upload__overlay.hidden');
const uploadInput = document.getElementById('upload-file');
const closeForm = document.getElementById('upload-cancel');

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

export {clickOpenForm, clickCloseForm, closeEventListeners};
