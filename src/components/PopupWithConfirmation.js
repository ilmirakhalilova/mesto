import Popup from './Popup.js';

//попап подтверждения удаления карточки
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  submitCallback(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    })
  }
}