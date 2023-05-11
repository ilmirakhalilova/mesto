//ПЕРЕМЕННЫЕ
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
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Функции для формы редактирования профиля
function openFormForEdit () {
  openPopup(editPopup);
  nameInput.value = personName.textContent;
  statusInput.value = personStatus.textContent;
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
}
addButtonLink.addEventListener('click', openFormForAdd);

function closeAddPopup () {
  closePopup(addPopup);
}
addPopupCloseButton.addEventListener('click', closeAddPopup);

function createNewCard(event){
  event.preventDefault();
  const manuallCardData = {
    name: nameAdd.value,
    link: linkAdd.value
  };
  cardsContainer.prepend(createCard(manuallCardData));
  closeAddPopup();
  addPopupForm.reset();
};
addPopupForm.addEventListener('submit',createNewCard);

//Добавление новой карточки
const createCard = (cardData) => {
  const cardElement = cardsTemplate.content.querySelector('.elements__element').cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image');
  const cardName = cardElement.querySelector('.elements__name');
  const likeButton = cardElement.querySelector('.elements__like');
  const deleteButton = cardElement.querySelector('.elements__delete');

  //наполнение карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardName.textContent = cardData.name;
  
  //кнопки лайк и удаление
  const handleLike = () => {
    likeButton.classList.toggle('elements__like_active');
  };
  const handleDelete = () => {
    cardElement.remove();
  };
  likeButton.addEventListener('click', handleLike);
  deleteButton.addEventListener('click', handleDelete);

  //попап большой картинки
  cardImage.addEventListener('click', () => {
    openPopup(popupImage);
    image.src = cardData.link;
    image.alt = cardData.name;
    imageCaption.textContent = cardData.name;
  });
  
  return cardElement;
};

function closePopupImage (){
  closePopup(popupImage);
};
imagePopupCloseButton.addEventListener('click', closePopupImage);

initialCards.forEach((card) => {
  const element = createCard(card);
  cardsContainer.prepend(element);
});
