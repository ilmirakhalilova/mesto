export default class Card{
  constructor(card, userId, templateSelector, {openPopupWithImage, deleteMyCard, putMyLike}) {
    this._card = card;
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    
    this._likes = card.likes;
    this._userId = userId;
    this._cardId = card._id;
    this._ownerId = card.owner._id;

    this._openPopupWithImage = openPopupWithImage;
    this._deleteMyCard = deleteMyCard;
    this._putMyLike = putMyLike;
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

  //удаление карточки
  deleteCard() {
    this._element.remove();
  }

  //установка слушателей карточки
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._putMyLike();
    });

    this._cardImg.addEventListener('click', () => {
      this._openPopupWithImage();
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    //элементы карточки
    this._cardImg = this._element.querySelector('.elements__image');
    this._cardTitle = this._element.querySelector('.elements__name');
    this._likeButton = this._element.querySelector('.elements__like');
    this._likeCounter = this._element.querySelector('.elements__countlikes');
    this._deleteButton = this._element.querySelector('.elements__delete');
    //слушатель на кнопку удаления
    if(this._ownerId === this._userId) {
      this._deleteButton.addEventListener('click', () => {
        this._deleteMyCard();
      })
    } else {
      this._deleteButton.remove();
    }

    if(this._likes.some((like) => like._id === this._userId)) {
      this._likeButton.classList.add('elements__like_active');
    }

    this._cardTitle.textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._likeCounter.textContent = this._likes.length;

    this._setEventListeners();
    return this._element;
  }

  checkMyLike() {
    return this._likes.some((like) => this._userId === like._id);
  }

  updateCountLikes(data) {
    this._likes = data.likes;
    this._likeCounter.textContent = this._likes.length;
    this._likeButton.classList.toggle('elements__like_active');
  }
}

