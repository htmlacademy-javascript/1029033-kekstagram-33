const COMMENTS_ERROR_MESSAGE = 'Комментарий не может превышать 140 символов.';
const HASHTAGS_ERROR_MESSAGE = 'Хэш-теги должны начинаться с "#" и не содержать специальных символов, кроме букв и цифр. Хэш-теги не должны повторяться (регистр не важен). Нельзя указать больше пяти хэштегов. Максимальная длина хэштега — 20 символов.';
const COMMENTS_ERROR_LENGTH = 140;
const hashtagPattern = /^#[a-zA-Zа-яА-Я0-9]{1,19}$/;
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

const clickCloseForm = () => {
  openForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.querySelector('.img-upload__form').reset();

  document.removeEventListener('keydown', onEscKeydown);
};

function onEscKeydown(evt) {
  if (evt.key === 'Escape' && !document.querySelector('.error') &&
    !(document.activeElement === textHashtagsDOMElement || document.activeElement === textDescriptionDOMElement)) {
    clickCloseForm();
  }
}

const showImagePreview = () => {
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

    document.removeEventListener('keydown', onEscKeydown);
    document.addEventListener('keydown', onEscKeydown);
  });
};


const registerCloseEventListeners = () => {
  closeFormDOMElement.addEventListener('click', clickCloseForm);
};

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value
    .trim()
    .split(/\s+/)
    .map((tag) => tag.toLowerCase())
    .filter(Boolean);

  if (hashtags.length > 5) {
    return false;
  }

  if (new Set(hashtags).size !== hashtags.length) {
    return false;
  }

  return hashtags.every((tag) => hashtagPattern.test(tag));
};


const validateComment = (value) => {
  if (!value.trim()) {
    return true;
  }

  return value.length <= COMMENTS_ERROR_LENGTH;
};


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

const toggleSubmitButton = () => {
  buttonSubmitDOMElement.disabled = !pristine.validate();
};

formDOMElement.addEventListener('input', toggleSubmitButton);


formDOMElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    return 'Форма валидна, можно отправлять';
  } else {
    return 'Форма не валидна';
  }
});

export { registerHendlerModalForm, registerCloseEventListeners, clickCloseForm };
