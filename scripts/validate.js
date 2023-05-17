const validationConfigs = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__message_input-error'
}

//функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, opt) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(opt.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(opt.errorClass);
};

//функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, opt) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(opt.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(opt.errorClass);
};

//функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, opt) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, opt);
  } else {
    hideInputError(formElement, inputElement, opt);
  }
};

//функция навешивания листенеров всем инпутам внутри формы
const setEventListeners = (formElement, opt) => {
  const inputList = Array.from(formElement.querySelectorAll(opt.inputSelector));
  const buttonElement = formElement.querySelector(opt.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, opt);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, opt);
      toggleButtonState(inputList, buttonElement, opt);
    });
  });
};

//функция прохождения по всем формам
const enableValidation = (opt) => {
  const formList = Array.from(document.querySelectorAll(opt.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, opt);
  });
};

//функция проверки валидности всех полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//функция стилизации кнопки
const toggleButtonState = (inputList, buttonElement, opt) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(opt.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(opt.inactiveButtonClass);
  }
};

enableValidation(validationConfigs);
