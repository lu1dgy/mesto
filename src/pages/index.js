import Card from '../components/Card.js';
import {
  setting,
  initialCards,
  editButton,
  addButton,
  popupEditForm,
  popupAddForm,
  popupPhoto,
  nameProfile,
  roleProfile,
  list
} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
//создание валидации для форм
const validationEditForm = new FormValidator(setting, popupEditForm);
const validationAddForm = new FormValidator(setting, popupAddForm);

const UserInformation = new UserInfo(nameProfile, roleProfile);
const popupWithImage = new PopupWithImage(popupPhoto)
const popupProfile = new PopupWithForm(popupEditForm, addUserInfo);
const popupCard = new PopupWithForm(popupAddForm, addCard);

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, list);

//колбэки сабмитов форм
function addUserInfo(data) {
  UserInformation.setUserInfo(data);
}
function addCard(formValue) {
  cardList.addItem(createCard(formValue));
}

//создание новой карточки
function createCard(item) {
  const card = new Card(item, '#photo-template', handleCardClick);
  const cardElement = card.generateCard()
  return cardElement
}
//открывает попап с картинкой
function handleCardClick(name, link) {
  popupWithImage.open(name, link)
}
// слушатели на нажатие кнопок
editButton.addEventListener('click', () => {
  validationEditForm.resetValidationErrors();
  const userData = UserInformation.getUserInfo();
  popupProfile.setInputValue(userData)
  popupProfile.open();
});
addButton.addEventListener('click', () => {
  popupCard.open();
  validationAddForm.resetValidationErrors();
});
//отрисовывает начальные карточки из переменной initialCards
cardList.renderItems();

//слушатели попапов наввешиваем
popupCard.setEventListeners();
popupWithImage.setEventListeners();
popupProfile.setEventListeners();

//включаем валидацию
validationEditForm.enableValidation();
validationAddForm.enableValidation();

export { handleCardClick, list }
