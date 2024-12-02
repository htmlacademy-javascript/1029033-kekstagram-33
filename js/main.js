
import {registerHendlerModalForm, registercloseEventListeners} from './adding-new-photo.js';
import {imageScale} from './image-scale.js';
import {overlayEffect} from './foto-effect.js';
import {getData, sendingData} from './interaction-server.js';
import {closeBigPictureModal} from './big-picture.js';
//const photoData = dataGeneration();

getData();
sendingData(closeBigPictureModal);
registerHendlerModalForm();
registercloseEventListeners();
imageScale();
overlayEffect();

