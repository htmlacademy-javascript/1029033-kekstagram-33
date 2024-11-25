const body = document.querySelector('body');
const openForm = document.querySelector('.img-upload__overlay.hidden');
const uploadInput = document.getElementById('upload-file');
const closeForm = document.getElementById('upload-cancel');
const form = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const previewImage = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');


const showImagePreview = function () {
  const file = uploadInput.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (evt) {
      const imageUrl = evt.target.result;


      previewImage.src = imageUrl;


      effectPreviews.forEach((preview) => {

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

const clickOpenForm = function () {
  uploadInput.addEventListener('change', () => {
    openForm.classList.remove('hidden');
    body.classList.add('modal-open');
    showImagePreview();
  });
};

const clickCloseForm = function () {
  openForm.classList.add('hidden');
  body.classList.remove('modal-open');
};

// Закрытие формы
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

  const hashtagPattern = /^#[a-zA-Zа-яА-Я0-9]{1,19}$/;

  return hashtags.every((tag) => hashtagPattern.test(tag));
};

const validateComment = (value) =>
  value.length <= 140;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

pristine.addValidator(
  textHashtags,
  validateHashtags,
  'Хэш-теги должны начинаться с "#" и не содержать специальных символов, кроме букв и цифр. Максимальная длина хэштега — 20 символов.',
  1
);

pristine.addValidator(
  textDescription,
  validateComment,
  'Комментарий не может превышать 140 символов.',
  2
);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    return 'Форма валидна, можно отправлять';

  } else {
    return 'Форма не валидна';
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && (document.activeElement === textHashtags || document.activeElement === textDescription)) {
    evt.stopPropagation();
  }
});

export { clickOpenForm, clickCloseForm, closeEventListeners };
