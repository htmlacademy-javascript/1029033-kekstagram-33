const body = document.querySelector('body');
const uploadPreview = document.querySelector('.img-upload');
const openForm = document.querySelector('.img-upload__overlay.hidden');
const uploadInputDOMElement = document.getElementById('upload-file');
const closeFormDOMElement = document.getElementById('upload-cancel');
const formDOMElement = uploadPreview.querySelector('.img-upload__form');
const textHashtagsDOMElement = uploadPreview.querySelector('.text__hashtags');
const textDescriptionDOMElement = uploadPreview.querySelector('.text__description');
const previewImageDOMElement = uploadPreview.querySelector('.img-upload__preview img');
const effectPreviewsDOMElement = uploadPreview.querySelectorAll('.effects__preview');
const buttonSubmitDOMElement = document.querySelector('.img-upload__submit');
const COMMENTS_ERROR_MESSAGE = 'Комментарий не может превышать 140 символов.';
const HASHTAGS_ERROR_MESSAGE = 'Хэш-теги должны начинаться с "#" и не содержать специальных символов, кроме букв и цифр. Максимальная длина хэштега — 20 символов.';
const COMMENTS_ERROR_LENGTH = 140;
const hashtagPattern = /^#[a-zA-Zа-яА-Я0-9]{1,19}$/;

const showImagePreview = function () {
  const file = uploadInputDOMElement.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (evt) {
      const imageUrl = evt.target.result;


      previewImageDOMElement.src = imageUrl;


      effectPreviewsDOMElement.forEach((preview) => {

        const img = preview.querySelector('img');
        if (img) {
          img.src = imageUrl;
        } else {

          preview.style.backgroundImage = `url(${imageUrl})`;
        }
      });
    };

    reader.readAsDataURL(file);
  }
};

const registerHendlerModalForm = () => {
  uploadInputDOMElement.addEventListener('change', () => {
    openForm.classList.remove('hidden');
    body.classList.add('modal-open');
    showImagePreview();
  });
};

const clickCloseForm = () => {
  openForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.querySelector('.img-upload__form').reset();
};

const registercloseEventListeners = () => {
  closeFormDOMElement.addEventListener('click', () => {
    clickCloseForm();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      clickCloseForm();
    }
  });
};

const validateHashtags = (value) => {
  if (!value) {
    return true;
  }

  const hashtags = value.split(' ').map((tag) => tag.toLowerCase());
  if (hashtags.length > 5) {
    return false;
  }
  if (new Set(hashtags).size !== hashtags.length) {
    return false;
  }

  return hashtags.every((tag) => hashtagPattern.test(tag));
};

const validateComment = (value) =>
  value.length <= COMMENTS_ERROR_LENGTH;

const pristine = new Pristine(formDOMElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

pristine.addValidator(
  textHashtagsDOMElement,
  validateHashtags,
  HASHTAGS_ERROR_MESSAGE,
  1
);

pristine.addValidator(
  textDescriptionDOMElement,
  validateComment,
  COMMENTS_ERROR_MESSAGE,
  2
);

formDOMElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    return 'Форма валидна, можно отправлять';

  } else {
    return 'Форма не валидна';
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && (document.activeElement === textHashtagsDOMElement || document.activeElement === textDescriptionDOMElement)) {
    evt.stopPropagation();
  }
});

const toggleSubmitButton = () => {
  if (pristine.validate()) {
    buttonSubmitDOMElement.disabled = false;
  } else {
    buttonSubmitDOMElement.disabled = true;
  }
};

formDOMElement.addEventListener('input', toggleSubmitButton);

toggleSubmitButton();

formDOMElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('Форма валидна, можно отправлять');
  } else {
    console.log('Форма не валидна');
  }
});

export { registerHendlerModalForm, clickCloseForm, registercloseEventListeners };
