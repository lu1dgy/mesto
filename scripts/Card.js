export default class Card {

  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

  generateCard() {
    this._element = this._getTemplate();
    // Добавим данные
    this._cardImage = this._element.querySelector('.card-item__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card-item__text').textContent = this._name;
    this._likeBtn = this._element.querySelector('.card-item__like-btn');
    //обработчики событий
    this._setEventListeners();

    // Вернём элемент наружу
    return this._element;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.card-item__delete-btn').addEventListener('click', (event) => {
      event.target.closest('.card-item').remove();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });


  }

  _handleLikeClick() {
    this._likeBtn.classList.toggle('card-item__like-btn_active');

  }


}

export { Card }
