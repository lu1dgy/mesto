
class Card {

  constructor(data, templateSelector) {

    this._text = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
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
    //обработчики событий
    this._setEventListeners();
    // Добавим данные
    this._element.querySelector('.card-item__image').src = this._image;
    this._element.querySelector('.card-item__text').textContent = this._text;

    // Вернём элемент наружу
    return this._element;
  }
  _setEventListeners() {
    this._element.querySelector('.card-item__like-btn').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.card-item__delete-btn').addEventListener('click', (event) => {
      event.target.closest('.card-item').remove();
    });
  }

  _handleLikeClick() {
    this._element.querySelector('.card-item__like-btn').classList.toggle('card-item__like-btn_active');
  }

}

initialCards.forEach((item) => {
  const card = new Card(item, '#photo-template');
  const cardElement = card.generateCard();
  list.append(cardElement);
});
