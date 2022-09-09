let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');
let popupForm = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#profile-name');
let roleInput = document.querySelector('#profile-role');
let nameProfile = document.querySelector('.profile__name');
let roleProfile = document.querySelector('.profile__role');

function popupOpened() {
  popupForm.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  roleInput.value = roleProfile.textContent;
}

function popupClose() {
  popupForm.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  let nameValue = nameInput.value;
  let roleValue = roleInput.value;
  // Вставьте новые значения с помощью textContent
  nameProfile.textContent = nameValue;
  roleProfile.textContent = roleValue;
  popupClose();
}

editButton.addEventListener('click', popupOpened);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);
