const editButtonLink = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_edit");
const editPopupCloseButton = editPopup.querySelector(".popup__close");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const statusInput = editPopup.querySelector(".popup__input_type_status")
const editPopupSubmit = editPopup.querySelector(".popup__submit");
const editPopupForm = editPopup.querySelector(".popup__form");

const personName = document.querySelector(".profile__name");
const personStatus = document.querySelector(".profile__status");

editButtonLink.addEventListener('click', () => {
  console.log('click');
  editPopup.classList.add('popup_opened');

  nameInput.value = personName.textContent;
  statusInput.value = personStatus.textContent;
});

editPopupCloseButton.addEventListener('click', () => {
  editPopup.classList.remove('popup_opened');
});

editPopupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  personName.innerHTML = nameInput.value;
  personStatus.innerHTML = statusInput.value;
  editPopup.classList.remove('popup_opened');
});
