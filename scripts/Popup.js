export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector
    this._handleEscClose = this._handleEscClose.bind(this)
    this.close = this.close.bind(this)
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__overlay').addEventListener('click', this.close);
    this._popup.querySelector('.popup__close-btn').addEventListener('click', this.close)
  }
}
