const imgUpload = document.querySelector('.img-upload__overlay');
const valueEffects = imgUpload.querySelector('.effect-level__value');
const effectsItems = imgUpload.querySelectorAll('.effects__item');
const slider = imgUpload.querySelector('.effect-level__slider');
const preview = imgUpload.querySelector('.img-upload__preview img');
const effectLevel = imgUpload.querySelector('.img-upload__effect-level');

const ORIGINAL = 0;
const CHROM = 1;
const SEPIA = 2;
const MARVIN = 3;
const PHOBOS = 4;
const HEAT = 5;

let currentEffectIndex = ORIGINAL;

const originalEffects = () => {
  preview.style.filter = '';
  effectLevel.classList.add('hidden');
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
});

const applyFilter = (value) => {
  switch (currentEffectIndex) {
    case CHROM:
      preview.style.filter = `grayscale(${value})`;
      effectLevel.classList.remove('hidden');
      break;
    case SEPIA:
      preview.style.filter = `sepia(${value})`;
      effectLevel.classList.remove('hidden');
      break;
    case MARVIN:
      preview.style.filter = `invert(${value}%)`;
      effectLevel.classList.remove('hidden');
      break;
    case PHOBOS:
      preview.style.filter = `blur(${value}px)`;
      effectLevel.classList.remove('hidden');
      break;
    case HEAT:
      preview.style.filter = `brightness(${value + 1})`;
      effectLevel.classList.remove('hidden');
      break;
    case ORIGINAL:
      originalEffects();
      break;
    default:
      preview.style.filter = '';
  }
};

slider.noUiSlider.on('update', () => {
  const changeValue = slider.noUiSlider.get();
  valueEffects.textContent = changeValue;


  applyFilter(changeValue);
});


const overlayEffect = () => {
  effectsItems.forEach((effectsItem, index) => {
    effectsItem.addEventListener('click', () => {
      currentEffectIndex = index;

      if (index === HEAT) {
        slider.noUiSlider.updateOptions({
          range: { min: 1, max: 3 },
          start: 1,
          step: 0.1,
        });
      } else if (index === PHOBOS) {
        slider.noUiSlider.updateOptions({
          range: { min: 0, max: 3 },
          start: 0,
          step: 0.1,
        });
      } else if (index === MARVIN) {
        slider.noUiSlider.updateOptions({
          range: { min: 0, max: 100 },
          start: 0,
          step: 1,
        });
      } else if (index === SEPIA || index === CHROM) {
        slider.noUiSlider.updateOptions({
          range: { min: 0, max: 1 },
          start: 0,
          step: 0.1,
        });
      } else if (index === ORIGINAL) {
        originalEffects();
        slider.noUiSlider.updateOptions({
          range: { min: 0, max: 1 },
          start: 0,
          step: 0.1,
        });
      }

      slider.noUiSlider.set(index === ORIGINAL ? 0 : slider.noUiSlider.options.range.min);

      if (index === ORIGINAL) {
        preview.style.filter = '';
      }

      effectLevel.classList.toggle('hidden', index === ORIGINAL);
    });
  });
};


export { overlayEffect };
