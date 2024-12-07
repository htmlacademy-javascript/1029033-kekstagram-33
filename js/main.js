import {registerHendlerModalForm, clickCloseForm, registercloseEventListeners} from './adding-new-photo.js';
import {imageScale} from './image-scale.js';
import {overlayEffect} from './foto-effect.js';
import {getData, sendingData} from './interaction-server.js';


getData();
sendingData(clickCloseForm);
registerHendlerModalForm();
registercloseEventListeners();
imageScale();
overlayEffect();
