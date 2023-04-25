const editButtonLink = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup');
const editPopupCloseButton = editPopup.querySelector('.popup__close');
const nameInput = editPopup.querySelector('.popup__input_type_name');
const statusInput = editPopup.querySelector('.popup__input_type_status')
const editPopupSubmit = editPopup.querySelector('.popup__submit');
const editPopupForm = editPopup.querySelector('.popup__form');
const personName = document.querySelector('.profile__name');
const personStatus = document.querySelector('.profile__status');

function openFormForEdit () {
  editPopup.classList.add('popup_opened');
  nameInput.value = personName.textContent;
  statusInput.value = personStatus.textContent;
}
editButtonLink.addEventListener('click', openFormForEdit);

function closeForm () {
  editPopup.classList.remove('popup_opened');
}
editPopupCloseButton.addEventListener('click', closeForm);

function handleFormSubmit (event) {
  event.preventDefault();
  personName.textContent = nameInput.value;
  personStatus.textContent = statusInput.value;
  closeForm();
}
editPopupForm.addEventListener('submit', handleFormSubmit);
