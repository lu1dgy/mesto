import './index.css';
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
  avatarProfile,
  list
} from '../utils/constants.js';
import Api from '../components/Api';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
//создание валидации для форм
const validationEditForm = new FormValidator(setting, popupEditForm);
const validationAddForm = new FormValidator(setting, popupAddForm);

const UserInformation = new UserInfo(nameProfile, roleProfile, avatarProfile);
const popupWithImage = new PopupWithImage(popupPhoto)
const popupProfile = new PopupWithForm(popupEditForm, addUserInfo);
const popupCard = new PopupWithForm(popupAddForm, addCard);


//Загрузка информации о пользователе с сервера
// fetch('https://mesto.nomoreparties.co/v1/cohort-54/users/me', {
//   headers: {
//     authorization: '9bfccefc-8718-447d-b89b-81c9283e3c21'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     avatarProfile.src = result.avatar;
//     nameProfile.textContent = result.name;
//     roleProfile.textContent = result.about;
//   });
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-54/',
  headers: {
    authorization: '9bfccefc-8718-447d-b89b-81c9283e3c21',
    'Content-Type': 'application/json'
  }
})

api.getData()
  .then(([user, data]) => {
    UserInformation.setUserInfo(user)
    UserInformation.setUserAvatar(user.avatar)

    data.forEach((element) => {
      cardList.addItem(createCard(element));
    })
  });



// fetch('https://mesto.nomoreparties.co/v1/cohort-54/cards', {
//   headers: {
//     authorization: '9bfccefc-8718-447d-b89b-81c9283e3c21'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     const data = result;
//     console.log(data)
//   })





const cardList = new Section({
  items: [],
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
