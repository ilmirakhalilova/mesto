export default class FormValidator {
  constructor(configs, form) {
    this._form = form;
    //this._formSelector = configs.formSelector;
    this._inputSelector = configs.inputSelector;
    this._submitButtonSelector = configs.submitButtonSelector;
    this._buttonElement = form.querySelector(configs.submitButtonSelector);
    this._inactiveButtonClass = configs.inactiveButtonClass;
    this._inputErrorClass = configs.inputErrorClass;
    this._errorClass = configs.errorClass;
  };

  //функция, которая добавляет класс с ошибкой
  _showInputError (inputElement, errorElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  //функция, которая удаляет класс с ошибкой
  hideInputError = (inputElement, errorElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };

  //функция, которая проверяет валидность поля
  _isValid(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement, errorElement);
    }
  };

  //функция отключения кнопки
  disableSubmitButton() {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  //функция активации кнопки
  _enableSubmitButton() {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  //функция стилизации кнопки
  toggleButtonState() {
    if (!this._form.checkValidity()) {
      this.disableSubmitButton ();
    } else {
      this._enableSubmitButton ();
    }
  };

  //функция навешивания листенеров всем инпутам внутри формы
  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this.toggleButtonState();
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this.toggleButtonState();
      });
    });
  };

  //функция валидации формы
  enableValidation() {
    this._setEventListeners();
    this.toggleButtonState();
  };
}
