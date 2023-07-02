import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, form,  submitCallback) {
    super(popupSelector);
    this._popupForm = form;
    this._inputList = Array.from(form.querySelectorAll('.popup__input'));
    this._submitCallback = submitCallback;
    this._popupSubmit = this._popupForm.querySelector('.popup__submit');
    this._popupSubmitText = this._popupSubmit.textContent;
  }

  //Метод собирает массив всех полей в форме, обходит их и добавляет их значения в объект
  //Ключи объекта - атрибуты name каждого поля
  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    })
  }

  renderLoading(isSaving) {
    if(isSaving) {
      this._popupSubmit.textContent = "Сохранение...";
    } else {
      this._popupSubmit.textContent = this._popupSubmitText;
    }

  }
}