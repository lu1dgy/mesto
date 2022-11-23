export default class Card {

  constructor(data, templateSelector, openPhoto, idUser, addLike, removeLike, removeCard) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPhoto = openPhoto;
    this._id = data._id;
    this._likes = data.likes;
    this._userId = idUser;
    this._ownerId = data.owner._id;
    this._removeCard = removeCard;
    this._addLike = addLike;
    this._removeLike = removeLike;
  }

  _getTemplate() {
    //Забрали разметку карточки и склонировали
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card-item')
      .cloneNode(true);
    //вернули карточку
    return cardElement;
  }

  //удаляет карточку
  deleteCard() {
    this._element.remove()
  }

  generateCard() {
    this._element = this._getTemplate();
    // Добавим данные
    this._cardImage = this._element.querySelector('.card-item__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card-item__text').textContent = this._name;
    this._likeBtn = this._element.querySelector('.card-item__like-btn');
    this._deleteBtn = this._element.querySelector('.card-item__delete-btn');
    this._likeCounter = this._element.querySelector('.card-item__like-counter');
    this._likeCounter.textContent = `${this._likes.length}`;
    this._setEventListeners();

    this.isLiked();
    this.isOwner();
    return this._element;
  }

  setLikeCount(res) {
    this._likeCounter.textContent = res.likes.length;
  }

  //добавляет на карточку лайк, если вы уже его ставили
  isLiked() {
    this._likes.forEach((user) => {
      if (user._id === this._userId) {
        this.addLike();
      } else {
        this.removeLike();
      }
    });
  }
  addLike() {
    this._likeBtn.classList.add('card-item__like-btn_active');
  }
  removeLike() {
    this._likeBtn.classList.remove('card-item__like-btn_active');
  }

  isOwner() {
    if (this._userId !== this._ownerId) {
      this._deleteBtn.remove()
    }
  }

  _handleLikeClick(id) {
    if (this._likeBtn.classList.contains('card-item__like-btn_active')) {
      this._removeLike(id)
    } else {
      this._addLike(id)
    }
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });

    this._deleteBtn.addEventListener('click', () => {
      this._removeCard(this._id);
    });

    this._cardImage.addEventListener('click', () => {
      this._openPhoto(this._name, this._link)
    });
  }
}

export { Card }
