import { Card } from './Card.js';
import { setting } from './constants.js';
import { FormValidator } from './FormValidator.js';

const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const popupEditForm = document.querySelector('.popupEditForm');
const popupAddForm = document.querySelector('.popupAddForm');
const popupPhoto = document.querySelector('.popup_type_photo');
const closeButtons = document.querySelectorAll('.popup__close-btn');
const profileForm = document.querySelector('.popup__form');
const photoForm = document.querySelector('.popup__form_type_photo');
const nameInput = document.querySelector('#profile-name');
const roleInput = document.querySelector('#profile-role');
const titleInput = document.querySelector('#profile-description');
const photoInput = document.querySelector('#profile-photo');
const nameProfile = document.querySelector('.profile__name');
const roleProfile = document.querySelector('.profile__role');
const list = document.querySelector('.card__items');
const photo = document.querySelector('.popup__image');
const photoText = document.querySelector('.popup__image-name');
const popupOverlay = document.querySelectorAll('.popup__overlay');
const validationEditForm = new FormValidator(setting, popupEditForm);
const validationAddForm = new FormValidator(setting, popupAddForm);

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscButton);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscButton);
}

function handleCardClick(name, link) {
  photo.src = link;
  photoText.textContent = name;
  photo.alt = name;
  openPopup(popupPhoto);
}

function handleProfileFormSubmit(evt) {
  const nameValue = nameInput.value;
  const roleValue = roleInput.value;
  nameProfile.textContent = nameValue;
  roleProfile.textContent = roleValue;
  closePopup(popupEditForm);
}

function handleEscButton(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

function handleOverlayClose() {
  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup);
}

editButton.addEventListener('click', () => {
  openPopup(popupEditForm);
  validationEditForm.resetValidationErrors();
  nameInput.value = nameProfile.textContent;
  roleInput.value = roleProfile.textContent;
});

addButton.addEventListener('click', () => {
  openPopup(popupAddForm);
  validationAddForm.resetValidationErrors();
});
//При нажатии на кнопку 'крестик' закрывает попап

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


popupOverlay.forEach((overlay) => {
  overlay.addEventListener('click', handleOverlayClose)
})

profileForm.addEventListener('submit', handleProfileFormSubmit);


//Функционал добавления карточки на сайт при отправке формы
function addCard(name, link) {
  const data = {
    name: name,
    link: link
  }
  const template = new Card(data, '#photo-template', handleCardClick);
  const templateElement = template.generateCard();
  list.prepend(templateElement);
}

function handlePhotoFormSubmit(evt) {
  addCard(titleInput.value, photoInput.value);
  photoForm.reset();
  closePopup(popupAddForm);
}

photoForm.addEventListener('submit', handlePhotoFormSubmit);
validationEditForm.enableValidation();
validationAddForm.enableValidation();
export { handleCardClick, list }

