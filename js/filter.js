import {getData} from './interaction-server.js';
const filterSection = document.querySelector('.img-filters');
const filterDefault = document.getElementById('filter-default');
const filterRandom = document.getElementById('filter-random');
const filterDiscussed = document.getElementById('filter-discussed');
const RERENDER_DELAY = 500;
let timeoutId;


const debounce = (callback, timeoutDelay) => (...rest) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
};

const showFilter = () => {
  filterSection.classList.remove('img-filters--inactive');
};


const filterClick = () => {

  filterRandom.addEventListener('click',() => {
    filterRandom.classList.add('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    debounce(getData, RERENDER_DELAY)();
  });

  filterDefault.addEventListener('click',() => {
    filterRandom.classList.remove('img-filters__button--active');
    filterDefault.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    debounce(getData, RERENDER_DELAY)();
  });

  filterDiscussed.addEventListener('click',() => {
    filterRandom.classList.remove('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');
    debounce(getData, RERENDER_DELAY)();
  });
};


export{showFilter,filterClick};
