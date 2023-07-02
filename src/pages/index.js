import Card from '../components/Card.js';
import {initialCards, validationConfig} from '../components/constants.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import './index.css'; //импорт главного файла стилей

let userId;


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: 'db32af4e-65bc-4fee-86db-efd37a52aabf',
    'Content-Type': 'application/json'
  }
});

//Загрузка данных профиля и галерии карточек с сервера при открытии сайта
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then (([infoUser, cards]) => {
  userId = infoUser._id;
  //профиль
  userInfo.setUserInfo(infoUser);
  //отрисовка карточек
  cardList.renderItems(cards.reverse());
})
.catch((err) => {
  console.log(err); // выведем ошибку в консоль
});

function createCard(item) {
  const card = new Card(item, userId, '.elements__card-template', {
    openPopupWithImage: () => {
    popupImage.open(item.name, item.link);
    },
    deleteMyCard: () => {
      popupDeleteCard.open();
      popupDeleteCard.submitCallback(() => {
        api.deleteMyCard(item._id)
        .then((result) => {
          card.deleteCard();//(result)
          popupDeleteCard.close();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
      })
    },
    putMyLike: () => { //проверяет наличие лайка и делает противоположное действие
      if (!card.checkMyLike()) {
        api.putMyLike(item._id)
        .then((result) => {
          card.updateCountLikes(result);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
      }
      else {
        api.deleteMyLike(item._id)
        .then((result) => {
          card.updateCountLikes(result);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
      }
    }
  });
  return card.generateCard();
};

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.elements');



//Попап редактирование профиля
const editPopup = document.querySelector('.popup_edit');
const editPopupForm = editPopup.querySelector('.popup__form');
const editPopupOpenButton = document.querySelector('.profile__edit-button');
//Попап добавления
const addPopup = document.querySelector('.popup_add');
const addPopupForm = addPopup.querySelector('.popup__form');
const addButtonLink = document.querySelector('.profile__add-button');
//Попап удаления карточки
//const deleteCardPopup = document.querySelector('.popup_delete');
//const deleteCardPopupForm = deleteCardPopup.querySelector('.profile-form');
//const deleteCardPopupButton = document.querySelector('.elements__delete');
//Попап смены аватара
const changeAvatarPopup = document.querySelector('.popup_update-avatar');
const changeAvatarPopupForm = changeAvatarPopup.querySelector('.popup__form');
const changeAvatarPopupButton = document.querySelector('.profile__avatar-edit-button');

const userInfo = new UserInfo({selectorUserName: '.profile__name', selectorUserStatus: '.profile__about', selectorUserAvatar: '.profile__avatar'});



//Попап редактирования профиля
const popupProfile = new PopupWithForm('.popup_edit', editPopupForm, (data) => {
  popupProfile.renderLoading(true);
  api.setUserInfo(data)
  .then((result) => {
    userInfo.setUserInfo(result);
    popupProfile.close();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally(() => {
    popupProfile.renderLoading(false);
  })
});
popupProfile.setEventListeners();
//открытие попапа для изменения данных профиля (карандаш)
editPopupOpenButton.addEventListener('click', () => {
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
  validatorProfile.resetErrors();
});

//Попап смены аватара
const popupChangeAvatar = new PopupWithForm('.popup_update-avatar', changeAvatarPopupForm, (data) => {
  const newData = {
    avatar: data['linkavatar']
  }
  popupChangeAvatar.renderLoading(true);
  api.changeUserAvatar(newData)
  .then((result) => {
    userInfo.setUserInfo(result);
    popupChangeAvatar.close();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally(() => {
    popupChangeAvatar.renderLoading(false);
  })
})
popupChangeAvatar.setEventListeners();
changeAvatarPopupButton.addEventListener('click', () => {
  popupChangeAvatar.open();
  validatorAvatar.resetErrors();
})

//Попап добавления новой карточки
const popupAddCard = new PopupWithForm('.popup_add', addPopupForm, (data) => {
  const newData = {
    name: data['place-name'],
    link: data['link-place']
  }
  popupAddCard.renderLoading(true);
  api.addNewCard(newData)
  .then((result) => {
    cardList.addItem(createCard(result));
    popupAddCard.close();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally(() => {
    popupAddCard.renderLoading(false);
  })
});
popupAddCard.setEventListeners();
//открытие попапа для добавления новой карточки (+)
addButtonLink.addEventListener('click', () => {
  popupAddCard.open();
  validatorNewCard.resetErrors();
});


//Попап большое изображение карточки
const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();

//Попап подтверждения удаления карточки
const popupDeleteCard = new PopupWithConfirmation('.popup_delete');
popupDeleteCard.setEventListeners();


///////FormValidation
const validatorProfile = new FormValidator(validationConfig, editPopupForm);
validatorProfile.enableValidation();
const validatorNewCard = new FormValidator(validationConfig, addPopupForm);
validatorNewCard.enableValidation();
const validatorAvatar = new FormValidator(validationConfig, changeAvatarPopupForm);
validatorAvatar.enableValidation();
