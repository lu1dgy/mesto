const setting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__input-error_active',
  errorMessageClass: '.popup__input-error'
}

const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const popupEditForm = document.querySelector('.popupEditForm');
const popupAddForm = document.querySelector('.popupAddForm');
const popupConfirm = document.querySelector('.popupConfirmForm')
const popupAvatar = document.querySelector('.popupAddAvatarForm')
const popupPhoto = document.querySelector('.popup_type_photo');
const nameProfile = document.querySelector('.profile__name');
const roleProfile = document.querySelector('.profile__role');
const avatarProfile = document.querySelector('.profile__avatar');
const list = '.card__items'

export {setting, editButton, addButton, popupEditForm, popupAddForm, popupAvatar, popupPhoto, popupConfirm, nameProfile, roleProfile, avatarProfile, list}
