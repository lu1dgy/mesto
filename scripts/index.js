const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const createButton = document.querySelector('.popup__create-btn');
const popup = document.querySelector('.popup');
const popupEditForm = document.querySelector('.popupEditForm');
const popupAddForm = document.querySelector('.popupAddForm');
const popupPhotoForm = document.querySelector('.popup_type_photo');
const closeButtonEdit = popupEditForm.querySelector('.popup__close-btn');
const closeButtonAdd = popupAddForm.querySelector('.popup__close-btn');
const closeButtonPhoto = popupPhotoForm.querySelector('.popup__close-btn');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('#profile-name');
const roleInput = document.querySelector('#profile-role');
const titleInput = document.querySelector('#profile-description');
const photoInput = document.querySelector('#profile-photo');
const nameProfile = document.querySelector('.profile__name');
const roleProfile = document.querySelector('.profile__role');
const list = document.querySelector('.card__items');
const photo = document.querySelector('.popup__image')
const photoText = document.querySelector('.popup__image-name')
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

function popupEditOpened() {
  popupEditForm.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  roleInput.value = roleProfile.textContent;
}

function popupAddOpened() {
  popupAddForm.classList.add('popup_opened');
}

function popupPhotoOpened(event) {
  const currentPhoto = event.target.closest('.card-item__image');
  const currentBlock = event.target.closest('.card-item');
  const currentText = currentBlock.querySelector('.card-item__text')
  photo.src = currentPhoto.src;
  photo.alt = currentPhoto.alt;
  photoText.textContent = currentText.textContent;
  popupPhotoForm.classList.add('popup_opened');
}

function popupCloseEdit() {
  popupEditForm.classList.remove('popup_opened');
}

function popupCloseAdd() {
  popupAddForm.classList.remove('popup_opened');
}

function popupClosePhoto(t) {
  popupPhotoForm.classList.remove('popup_opened');
}
//запускает 6 карточек на страницу при загрузке из массива initialCards
initialCards.forEach(function (el) {
  photoInput.value = el.link;
  titleInput.value = el.name;
  addCard();
  titleInput.value = '';
  photoInput.value = '';
})
//добавляет карточку при нажатии на кнопку в попапе
function addCard() {
  const template = document.querySelector('#photo-template').content;
  const templateElement = template.cloneNode(true);
  const photo = templateElement.querySelector('.card-item__image');
  const title = templateElement.querySelector('.card-item__text');
  photo.src = photoInput.value;
  photo.alt = titleInput.value;
  title.textContent = titleInput.value;
  setListenerFor(templateElement);
  list.append(templateElement);
};

//удаляет карточку близлежайшую к кнопке удалить
function deleteCard(event) {
  const currentListItem = event.target.closest('.card-item');// получаем родителя кнопки
  currentListItem.remove();
}

//добавляет слушатели к кнопкам
function setListenerFor(element) {
  const likeButton = element.querySelector('.card-item__like-btn');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card-item__like-btn_active');
  })
  const deleteButton = element.querySelector('.card-item__delete-btn');
  deleteButton.addEventListener('click', deleteCard);

  const photoElement = element.querySelector('.card-item__image');
  photoElement.addEventListener('click', popupPhotoOpened);
}


function formSubmitHandler(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const roleValue = roleInput.value;
  nameProfile.textContent = nameValue;
  roleProfile.textContent = roleValue;
  popupCloseEdit();
}

createButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  addCard();
  titleInput.value = '';
  photoInput.value = '';
  popupCloseAdd();
})

editButton.addEventListener('click', popupEditOpened);
addButton.addEventListener('click', popupAddOpened);
closeButtonEdit.addEventListener('click', popupCloseEdit);
closeButtonAdd.addEventListener('click', popupCloseAdd);
closeButtonPhoto.addEventListener('click', popupClosePhoto)
formElement.addEventListener('submit', formSubmitHandler);




