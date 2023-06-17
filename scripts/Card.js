import { openPopup } from "./index.js";

export default class Card{
  constructor(data, templateSelector, handleOpenPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
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
    this._handleOpenPopup(this._name, this._link);
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

