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

const userInformation = new UserInfo(nameProfile, roleProfile, avatarProfile);
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
    userInformation.setUserInfo(user)
    userInformation.setUserAvatar(user.avatar)
    cardList.renderItems(data)
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
      userInformation.setUserInfo(user);
      popupProfile.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.load(false);
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
    })
    .finally(() => {
      popupCard.load(false)
    })
    ;
}

function addAvatar(image) {
  popupAvatarForm.load(true)
  api.getUserAvatar(image.link)
    .then((res) => {
      userInformation.setUserAvatar(res.avatar)
      popupAvatarForm.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatarForm.load(false);
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
        })
        .finally(() => {
          card.addLike()
        });
    },
    (id) => {
      api.removeLike(id)
        .then((res) => {
          card.setLikeCount(res)
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          card.removeLike()
        });
    },
    (id) => {
      popupConfirmForm.open()
      popupConfirmForm.setNewSubmitCallBack(() => {
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
  formValidators['profile-form'].resetValidationErrors()
  const userData = userInformation.getUserInfo();
  popupProfile.setInputValue(userData)
  popupProfile.open();
});
addButton.addEventListener('click', () => {
  formValidators['add-form'].resetValidationErrors()
  popupCard.open();
});

avatarProfile.addEventListener('click', () => {
  popupAvatarForm.open();
  formValidators['avatar-form'].resetValidationErrors();
})

//слушатели попапов наввешиваем
popupCard.setEventListeners();
popupWithImage.setEventListeners();
popupProfile.setEventListeners();
popupConfirmForm.setEventListeners()
popupAvatarForm.setEventListeners();

// Включение валидации
const formValidators = {}
const enableValidation = (setting) => {
  const formList = Array.from(document.querySelectorAll(setting.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(setting, formElement)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(setting);

export { openPhoto, list }
