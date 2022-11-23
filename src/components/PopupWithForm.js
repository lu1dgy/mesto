import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(popupSelector, submitCallBack) {
    super(popupSelector);
    this._submitCallBack = submitCallBack;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__text');
    this._button = this._form.querySelector('.popup__button');
    this._buttonText = this._button.textContent;
  }

  _getInputValues() {
    const formValue = {};
    this._inputList.forEach((element) => {
      formValue[element.name] = element.value;
    });
    return formValue;
  }

  setInputValue(elements) {
    this._inputList.forEach((element) => {
      element.value = elements[element.name]
    })
  }

  close() {
    super.close();
    this._form.reset();
  }

  setNewSubmitCallBack(newHandler) {
    this._submitCallBack = newHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._submitCallBack(this._getInputValues())
    })
  }

  load(isLoading) {
    if (isLoading) {
      this._button.textContent = 'Сохранение...'
    } else {
      this._button.textContent = this._buttonText;
    }
  }

}
