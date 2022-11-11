export default class FormValidator {

  constructor(setting, form) {
    this._setting = setting;
    this._form = form;
    this._buttonElement = this._form.querySelector(this._setting.submitButtonSelector)
    this._inputList = Array.from(this._form.querySelectorAll(this._setting.inputSelector));
  }

  _toggleButtonState() {
    //проверяем все ли поля валидны
    const isValid = this._inputList.every((inputElement) => {
      return inputElement.checkValidity() === true;
    })
    this._buttonElement.classList.toggle(this._setting.inactiveButtonClass, !isValid);
    this._buttonElement.disabled = !isValid;
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._setting.inputErrorClass);
    errorElement.classList.add(this._setting.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._setting.inputErrorClass);
    errorElement.classList.remove(this._setting.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    // Срос перезагрузки страницы при отправке формы
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })

    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

  }
  resetValidationErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
    this._toggleButtonState()
  }

  enableValidation() {
    this._setEventListeners()
  }
}
