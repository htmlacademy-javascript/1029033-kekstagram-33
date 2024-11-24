const body = document.querySelector('body');
const openForm = document.querySelector('.img-upload__overlay.hidden');
const uploadInput = document.getElementById('upload-file');
const closeForm = document.getElementById('upload-cancel');
const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');


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


const validateHashtags = (value) => {
  if (!value) {
    return true;
  } // Хэш-теги необязательны, если поле пустое, считаем, что валидация пройдена.

  const hashtags = value.split(' ').map((tag) => tag.toLowerCase()); // Приводим к нижнему регистру для нечувствительности к регистру.

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
  value.length <= 140 // Комментарий не должен превышать 140 символов
;


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
    console.log('Форма валидна, можно отправлять');
    // Отправка данных или другие действия
  } else {
    console.log('Форма не валидна');
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && (document.activeElement === textHashtags || document.activeElement === textDescription)) {
    evt.stopPropagation();
  }
});

export {clickOpenForm, clickCloseForm, closeEventListeners};
