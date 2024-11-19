import {dataGeneration} from './data.js';
import {addingPhoto} from './photo-generation.js';
import {showPhoto} from './big-picture.js';

const photoData = dataGeneration();

addingPhoto(photoData);
showPhoto(photoData);
