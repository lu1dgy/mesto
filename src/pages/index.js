import './index.css';
import Card from '../components/Card.js';
import {
  setting,
  editButton,
  addButton,
  popupEditForm,
  popupAddForm,
  popupConfirm,
  popupAvatar,
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
const validationAvatarForm = new FormValidator(setting, popupAvatar)

const UserInformation = new UserInfo(nameProfile, roleProfile, avatarProfile);
const popupWithImage = new PopupWithImage(popupPhoto)
const popupProfile = new PopupWithForm(popupEditForm, addUserInfo);
const popupCard = new PopupWithForm(popupAddForm, addCard);
const popupConfirmForm = new PopupWithForm(popupConfirm);
const popupAvatarForm = new PopupWithForm(popupAvatar, addAvatar)
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-54/',
  headers: {
    authorization: '9bfccefc-8718-447d-b89b-81c9283e3c21',
    'Content-Type': 'application/json'
  }
})

//cоздаем пустую переменную с id
let idUser
api.getData()
  .then(([user, data]) => {
    //наполнили ее моим id
    idUser = user._id
    UserInformation.setUserInfo(user)
    UserInformation.setUserAvatar(user.avatar)
    data.forEach((element) => {
      cardList.addItemServer(createCard(element));
    })
  })
  .catch((err) => {
    console.log(err);
  });

const cardList = new Section({
  items: [],
  renderer: (item) => {
    cardList.addItemServer(createCard(item));
  }
}, list);

//колбэки сабмитов форм
function addUserInfo(data) {
  popupProfile.load(true)
  const { name, about } = data;
  api.setUserInfo(name, about)
    .then((user) => {
      UserInformation.setUserInfo(user);
      popupProfile.close()
    })
    .catch((err) => {
      console.log(err);
    });
}

function addCard(post) {
  popupCard.load(true)
  api.postUserCard(post)
    .then((data) => {
      cardList.addItemUser(createCard(data));
      popupCard.close()
    })
    .catch((err) => {
      console.log(err);
    });
}

function addAvatar(image) {
  popupAvatarForm.load(true)
  api.getUserAvatar(image.link)
    .then((res) => {
      UserInformation.setUserAvatar(res.avatar)
      popupAvatarForm.close()
    })
    .catch((err) => {
      console.log(err);
    });
}

//создание новой карточки
function createCard(data) {
  const card = new Card(
    data,
    '#photo-template',
    openPhoto,
    idUser,
    (id) => {
      api.addLike(id)
        .then((res) => {
          card.setLikeCount(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    (id) => {
      api.removeLike(id)
        .then((res) => {
          card.setLikeCount(res)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    (id) => {
      popupConfirmForm.open()
      popupConfirmForm.newSubmitCallBack(() => {
        api.removeCard(id)
          .then(() => {
            card.deleteCard()
            popupConfirmForm.close()
          })
          .catch((err) => {
            console.log(err);
          });
      })
    }
  );
  const cardElement = card.generateCard()
  return cardElement
}
//открывает попап с картинкой
function openPhoto(name, link) {
  popupWithImage.open(name, link)
}
// слушатели на нажатие кнопок
editButton.addEventListener('click', () => {
  validationEditForm.resetValidationErrors();
  popupProfile.load(false);
  const userData = UserInformation.getUserInfo();
  popupProfile.setInputValue(userData)
  popupProfile.open();
});
addButton.addEventListener('click', () => {
  validationAddForm.resetValidationErrors();
  popupCard.load(false)
  popupCard.open();
});

avatarProfile.addEventListener('click', () => {
  popupAvatarForm.open();
  validationAvatarForm.resetValidationErrors()
  popupAvatarForm.load(false)
})

//слушатели попапов наввешиваем
popupCard.setEventListeners();
popupWithImage.setEventListeners();
popupProfile.setEventListeners();
popupConfirmForm.setEventListeners()
popupAvatarForm.setEventListeners();
//включаем валидацию форм
validationEditForm.enableValidation();
validationAddForm.enableValidation();
validationAvatarForm.enableValidation();

export { openPhoto, list }
