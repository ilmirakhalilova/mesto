import {initialCards, Card} from './Card.js';

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
const cardsTemplate = document.getElementById('cards-template');
//Галерея картинок
const cardsContainer = document.querySelector('.elements');

//Попап на открытие большой картинки
const popupImage = document.querySelector('.popup_image');
const image = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__image-caption');
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
  hideInputError (editPopupForm, nameInput, validationConfigs.inputErrorClass, validationConfigs.errorClass);
  hideInputError (editPopupForm, statusInput, validationConfigs.inputErrorClass, validationConfigs.errorClass);
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
  hideInputError (addPopupForm, placeNameAdd, validationConfigs.inputErrorClass, validationConfigs.errorClass);
  hideInputError (addPopupForm, linkPlaceAdd, validationConfigs.inputErrorClass, validationConfigs.errorClass);
  const buttonElement = addPopupForm.querySelector(validationConfigs.submitButtonSelector);
  disableSubmitButton (buttonElement, validationConfigs.inactiveButtonClass);
}
addButtonLink.addEventListener('click', openFormForAdd);

function closeAddPopup () {
  closePopup(addPopup);
}
addPopupCloseButton.addEventListener('click', closeAddPopup);




///////////////////////////////////////

function createCard (item) {
  const card = new Card(item, '.elements__card-template');
  console.log(nameAdd.value + "  " + linkAdd.value);
  return card;
}


function createNewCard(event){
  event.preventDefault();
  const manuallCardData = {
    name: nameAdd.value,
    link: linkAdd.value
  };

  const cardElement = createCard(manuallCardData);
  console.log(cardElement);

  cardsContainer.prepend(cardElement);
  closeAddPopup();
  addPopupForm.reset(); //очистка popup вроде
};
addPopupForm.addEventListener('submit',createNewCard);



function closePopupImage (){
  closePopup(popupImage);
};
imagePopupCloseButton.addEventListener('click', closePopupImage);


initialCards.forEach((item) => {
  const card = createCard(item); //new Card(item, '.elements__card-template');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
});

/////////////////////////////////////////////






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
