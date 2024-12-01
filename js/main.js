import {dataGeneration} from './data.js';
import {addingPhoto} from './photo-generation.js';
import {showPhoto} from './big-picture.js';
import {registerHendlerModalForm, registercloseEventListeners} from './adding-new-photo.js';
import {imageScale} from './image-scale.js';
import {overlayEffect} from './foto-effect.js';


const photoData = dataGeneration();

addingPhoto(photoData);
showPhoto(photoData);
registerHendlerModalForm();
registercloseEventListeners();
imageScale();
overlayEffect();
