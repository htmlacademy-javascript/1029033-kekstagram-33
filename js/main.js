import {dataGeneration} from './data.js';
import {addingPhoto} from './photo-generation.js';
import {showPhoto} from './big-picture.js';
import {clickOpenForm, clickCloseForm, closeEventListeners} from './adding-new-photo.js';

const photoData = dataGeneration();

addingPhoto(photoData);
showPhoto(photoData);
clickOpenForm();
clickCloseForm();
closeEventListeners();
