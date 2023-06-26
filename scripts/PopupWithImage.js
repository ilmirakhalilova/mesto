import Popup from './Popup.js';
import {selectorPopupImage, selectorPopupImageCaption} from './constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = document.querySelector(selectorPopupImage);
    this._popupImageCaption = document.querySelector(selectorPopupImageCaption);
  }
  
  open(name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageCaption.textContent = name;
  }
}