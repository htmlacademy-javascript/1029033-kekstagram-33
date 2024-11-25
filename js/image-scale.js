const slider = document.querySelector('.scale');
const sliderElementBigger = document.querySelector('.scale__control--bigger');
const sliderElementSmaller = document.querySelector('.scale__control--smaller');
const sliderValue = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview');


const imageScale = noUiSlider.create(slider, {
  range : {
    min: 0,
    max: 100,
  },
  start: 100
});


export {imageScale};
