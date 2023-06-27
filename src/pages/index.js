import Card from '../components/Card.js';
import {initialCards, validationConfig} from '../components/constants.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import './index.css'; //импорт главного файла стилей 

//Попап редактирование профиля
const editPopup = document.querySelector('.popup_edit');
const editPopupForm = editPopup.querySelector('.popup__form');
const editPopupOpenButton = document.querySelector('.profile__edit-button');
//Попап добавления
const addPopup = document.querySelector('.popup_add');
const addPopupForm = addPopup.querySelector('.popup__form');
const addButtonLink = document.querySelector('.profile__add-button');

const userInfo = new UserInfo({selectorUserName: '.profile__name', selectorUserStatus: '.profile__status'});

function createCard(item) {
  const card = new Card(item, '.elements__card-template', () => {
    popupImage.open(item.name, item.link);
  });
  return card.generateCard();
};

//Попап редактирования профиля
const popupProfile = new PopupWithForm('.popup_edit', editPopupForm, (data) => {
  userInfo.setUserInfo(data);
  popupProfile.close();
});
popupProfile.setEventListeners();
//открытие попапа для изменения данных профиля (карандаш)
editPopupOpenButton.addEventListener('click', () => {
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
  validatorProfile.resetErrors();
});

//Попап добавления новой карточки
const popupAddCard = new PopupWithForm('.popup_add', addPopupForm, (data) => {
  cardList.addItem(createCard({name: data['place-name'], link: data['link-place']}));
  popupAddCard.close();
});
popupAddCard.setEventListeners();
//открытие попапа для добавления новой карточки (+)
addButtonLink.addEventListener('click', () => {
  popupAddCard.open();
  validatorNewCard.resetErrors();
});

//Галерея карточек
const cardList = new Section({items: initialCards, renderer: (item) => {
  cardList.addItem(createCard(item));
}}, '.elements');
//отрисовка карточек
cardList.renderItems();

//Попап большое изображение карточки
const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();

///////FormValidation
const validatorProfile = new FormValidator(validationConfig, editPopupForm);
validatorProfile.enableValidation();
const validatorNewCard = new FormValidator(validationConfig, addPopupForm);
validatorNewCard.enableValidation();
