import {initialCards, Card} from './Card.js';
import FormValidator from './FormValidator.js';

//ПЕРЕМЕННЫЕ
const popups = document.querySelectorAll('.popup');
//Попап редактирование профиля
const editPopupOpenButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_edit');
const editPopupCloseButton = editPopup.querySelector('.popup__close_edit');
const nameInput = editPopup.querySelector('.popup__input_type_name');
const statusInput = editPopup.querySelector('.popup__input_type_status');
const editPopupForm = editPopup.querySelector('.popup__form');
const personName = document.querySelector('.profile__name');
const personStatus = document.querySelector('.profile__status');

//Попап добавления
const addButtonLink = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_add');
const addPopupForm = addPopup.querySelector('.popup__form');
const addPopupCloseButton = addPopup.querySelector('.popup__close_add');
const nameAdd = addPopup.querySelector('.popup__input_new_place');
const linkAdd = addPopup.querySelector('.popup__input_link_place');
const placeNameAdd = addPopup.querySelector('.popup__input_new_place');
const linkPlaceAdd = addPopup.querySelector('.popup__input_link_place');

//Темплейт с карточками
//const cardsTemplate = document.getElementById('cards-template');
//Галерея картинок
const cardsContainer = document.querySelector('.elements');

//Попап на открытие большой картинки
const popupImage = document.querySelector('.popup_image');
//const image = document.querySelector('.popup__image');
//const imageCaption = document.querySelector('.popup__image-caption');
const imagePopupCloseButton = popupImage.querySelector('.popup__close_image');


//ФУНКЦИИ
  //Общие функции
    // Открытие поп-апов
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

//Функции для формы редактирования профиля
function openFormForEdit () {
  openPopup(editPopup);
  nameInput.value = personName.textContent;
  statusInput.value = personStatus.textContent;
  validatorProfile.hideInputError(nameInput, document.querySelector(`#name-error`));
  validatorProfile.hideInputError(statusInput, document.querySelector(`#status-error`));
}
editPopupOpenButton.addEventListener('click', openFormForEdit);

function closeEditPopup () {
  closePopup(editPopup);
}
editPopupCloseButton.addEventListener('click', closeEditPopup);

function handleEditFormSubmit (event) {
  event.preventDefault();
  personName.textContent = nameInput.value;
  personStatus.textContent = statusInput.value;
  closeEditPopup ();
}
editPopupForm.addEventListener('submit', handleEditFormSubmit);

//Функции для формы добавления в галерею
function openFormForAdd () {
  openPopup(addPopup);
  placeNameAdd.value = "";
  linkPlaceAdd.value = "";

  validatorNewCard.hideInputError (placeNameAdd, document.querySelector(`#place-name-error`));
  validatorNewCard.hideInputError (linkPlaceAdd, document.querySelector(`#link-place-error`));
  validatorNewCard.disableSubmitButton();
}
addButtonLink.addEventListener('click', openFormForAdd);

function closeAddPopup () {
  closePopup(addPopup);
}
addPopupCloseButton.addEventListener('click', closeAddPopup);



///////новые карточки
const createCard = item => {
  const card = new Card(item, '.elements__card-template');
  return card.generateCard();
}

function createNewCard(event){
  event.preventDefault();
  const manuallCardData = {
    name: nameAdd.value,
    link: linkAdd.value
  };

  const cardElement = createCard(manuallCardData);
  cardsContainer.prepend(cardElement);
  closeAddPopup();
  addPopupForm.reset(); //очистка popup вроде
};
addPopupForm.addEventListener('submit',createNewCard);

imagePopupCloseButton.addEventListener('click', () => {
  closePopup(popupImage);
});

initialCards.forEach((item) => {
  const card = createCard(item);
  cardsContainer.prepend(card);
});



//закрытие popup'а по клавише esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//навешивание листенеров на все popup'ы
popups.forEach((p) => {
  p.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      const popup = evt.target.closest('.popup');
      closePopup(popup);
    }
  })
})



///////FormValidation
const validationConfigs = {
  //formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__message_input-error'
}

const validatorProfile = new FormValidator(validationConfigs, editPopupForm);
validatorProfile.enableValidation();

const validatorNewCard = new FormValidator(validationConfigs, addPopupForm);
validatorNewCard.enableValidation();
