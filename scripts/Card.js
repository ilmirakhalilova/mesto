import { openPopup } from "./index.js";

//Данные
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export class Card{
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._popupImage = document.querySelector('.popup_image');
    this._popupImg =  document.querySelector('.popup__image');
    this._popupImgCaption = document.querySelector('.popup__image-caption');
  }

  //взятие шаблона карточки
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__element')
    .cloneNode(true);
    
    return cardElement;
  }

  //кнопк лайк
  _handleLike() {
    this._likeButton.classList.toggle('elements__like_active');
  };

  //кнопка удаления
  _handleDelete() {
    this._element.remove();
  };

  //попап большой картинки
  _handleImg() {
    openPopup(this._popupImage);
    this._popupImg.src = this._link;
    this._popupImg.alt = this._name;
    this._popupImgCaption.textContent = this._name;
  }

  //установка слушателей карточки
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDelete();
    });

    this._cardImg.addEventListener('click', () => {
      this._handleImg();
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImg = this._element.querySelector('.elements__image');
    this._cardTitle = this._element.querySelector('.elements__name');
    this._cardTitle.textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;

    this._likeButton = this._element.querySelector('.elements__like');
    this._deleteButton = this._element.querySelector('.elements__delete');

    this._setEventListeners();

    return this._element;
  }
}

