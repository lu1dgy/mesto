const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const createButton = document.querySelector('.popup__create-btn');
const popupEditForm = document.querySelector('.popupEditForm');
const popupAddForm = document.querySelector('.popupAddForm');
const popupPhotoForm = document.querySelector('.popup_type_photo');
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
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openPopup(popup) {
  const errorList = Array.from(document.querySelectorAll('.popup__input-error'));
  const inputList = Array.from(document.querySelectorAll('.popup__text'));
  inputList.forEach((errorElement) => {
    errorElement.classList.remove('popup__text_type_error')
  })
  errorList.forEach((errorElement) => {
    errorElement.textContent = '';
  })
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscButton);

}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscButton);
}

// Открывает фотокарточку в полный экран
function openPhotoPopup(event) {
  const currentPhoto = event.target.closest('.card-item__image');
  const currentBlock = event.target.closest('.card-item');
  const currentText = currentBlock.querySelector('.card-item__text')
  photo.src = currentPhoto.src;
  photo.alt = currentPhoto.alt;
  photoText.textContent = currentText.textContent;
  openPopup(popupPhotoForm);
}
//запускает 6 карточек на страницу при загрузке из массива initialCards
initialCards.forEach(item => {
  list.append(createCard(item.name, item.link));
})

function createCard(name, link) {
  const template = document.querySelector('#photo-template').content;
  const cardElement = template.cloneNode(true);
  const imagePopup = cardElement.querySelector('.card-item__image');
  const textPopup = cardElement.querySelector('.card-item__text');
  imagePopup.src = link;
  imagePopup.alt = name;
  textPopup.textContent = name;
  setListener(cardElement);
  return cardElement;
}
//добавляет карточку при нажатии на кнопку в попапе
function addCard(name, link) {
  const templateElement = createCard(name, link);
  list.prepend(templateElement);
}
//удаляет карточку близлежайшую к кнопке удалить
function deleteCard(event) {
  const currentListItem = event.target.closest('.card-item');// получаем родителя кнопки
  currentListItem.remove();
}
//добавляет слушатели к кнопкам
function setListener(element) {
  const likeButton = element.querySelector('.card-item__like-btn');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card-item__like-btn_active');
  })
  const deleteButton = element.querySelector('.card-item__delete-btn');
  deleteButton.addEventListener('click', deleteCard);

  const photoElement = element.querySelector('.card-item__image');
  photoElement.addEventListener('click', openPhotoPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const roleValue = roleInput.value;
  nameProfile.textContent = nameValue;
  roleProfile.textContent = roleValue;
  closePopup(popupEditForm);
}

function handlePhotoFormSubmit(evt) {
  evt.preventDefault();
  addCard(titleInput.value, photoInput.value);
  titleInput.value = '';
  photoInput.value = '';
  closePopup(popupAddForm);
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

editButton.addEventListener('click', function openEditPopup() {
  openPopup(popupEditForm);
  nameInput.value = nameProfile.textContent;
  roleInput.value = roleProfile.textContent;
});

addButton.addEventListener('click', () => {
  openPopup(popupAddForm);
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
photoForm.addEventListener('submit', handlePhotoFormSubmit);

// enableValidation();


// const showInputError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add('popup__text_type_error');
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add('popup__input-error_active');
// };

// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove('popup__text_type_error');
//   errorElement.classList.remove('popup__input-error_active');
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };

// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
//   const button = formElement.querySelector('.popup__button');
//   toggleButtonState(inputList, button);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, button);
//     });
//   });
// }

// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('.popup__form'));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement);
//   });
// }
