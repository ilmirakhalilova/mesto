export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    //this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._buttonElement = form.querySelector(config.submitButtonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  };

  //функция, которая добавляет класс с ошибкой
  _showInputError (inputElement, errorElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  //функция, которая удаляет класс с ошибкой
  _hideInputError = (inputElement, errorElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };

  //функция, которая проверяет валидность поля и управляет состоянием ошибки инпута
  _toggleInputErrorState(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement, errorElement);
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

  resetErrors() {
    this._inputList.forEach((inputElement) => {
      const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
      this._hideInputError(inputElement, errorElement);
    })
  }

  //функция навешивания листенеров всем инпутам внутри формы
  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleInputErrorState(inputElement);
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
