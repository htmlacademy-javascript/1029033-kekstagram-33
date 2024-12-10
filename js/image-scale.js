const CONVERSION_PERCENTAGE = 100;
const SLIDER_STEP = 25;
const uploadContainer = document.querySelector('.img-upload__preview-container');
const sliderElementBiggerDOMElement = uploadContainer.querySelector('.scale__control--bigger');
const sliderElementSmallerDOMElement = uploadContainer.querySelector('.scale__control--smaller');
const sliderValueDOMElement = uploadContainer.querySelector('.scale__control--value');
const imageDOMElement = uploadContainer.querySelector('.img-upload__preview img');


const changeImageScale = () => {
  sliderElementSmallerDOMElement.addEventListener('click',() => {
    let numberSliderValueSmaller = parseFloat(sliderValueDOMElement.value);
    if (numberSliderValueSmaller > SLIDER_STEP) {
      numberSliderValueSmaller -= SLIDER_STEP;
      sliderValueDOMElement.value = `${numberSliderValueSmaller}%`;
      imageDOMElement.style.transform = `scale(${numberSliderValueSmaller / CONVERSION_PERCENTAGE})`;
    }
  });

  sliderElementBiggerDOMElement.addEventListener('click',() => {
    let numberSliderValueBigger = parseFloat(sliderValueDOMElement.value);
    if (numberSliderValueBigger < CONVERSION_PERCENTAGE) {
      numberSliderValueBigger += SLIDER_STEP;
      sliderValueDOMElement.value = `${numberSliderValueBigger}%`;
      imageDOMElement.style.transform = `scale(${numberSliderValueBigger / CONVERSION_PERCENTAGE})`;
    }
  });

};

export { changeImageScale };
