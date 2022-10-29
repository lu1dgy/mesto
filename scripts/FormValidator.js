export class FormValidator {

  constructor(setting, form) {
    this._setting = setting;
    this._form = form;
    this._buttonElement = this._form.querySelector(this._setting.submitButtonSelector)
    this._inputList = this._form.querySelectorAll(this._setting.inputSelector);
  }
  _toggleButtonState() {
    const isValid = this._inputList[0].checkValidity() && this._inputList[1].checkValidity() //????
    this._buttonElement.classList.toggle(this._setting.inactiveButtonClass, !isValid)
    this._buttonElement.disabled = !isValid
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

  // disableSubmitButton(popup) {
  //   const editBtn = popup.querySelector(this._setting.submitButtonSelector);
  //   editBtn.classList.add(this._setting.inactiveButtonClass);
  //   editBtn.setAttribute('disabled', '');
  // }

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


// const showInputError = (formElement, inputElement, errorMessage, setting) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(this._setting.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(this._setting.errorClass);
// };

// const hideInputError = (formElement, inputElement, setting) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(this._setting.inputErrorClass);
//   errorElement.classList.remove(this._setting.errorClass);
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement, setting) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, setting);
//   } else {
//     hideInputError(formElement, inputElement, setting);
//   }
// };

// const setEventListeners = (formElement, setting) => {
//   const inputList = Array.from(formElement.querySelectorAll(this._setting.inputSelector));
//   const button = formElement.querySelector(this._setting.submitButtonSelector);
//   toggleButtonState(inputList, button, setting);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement, setting);
//       toggleButtonState(inputList, button, setting);
//     });
//   });
// }

// const enableValidation = (setting) => {
//   const formList = Array.from(document.querySelectorAll(this._setting.formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, setting);
//   });
// }

// const resetValidationErrors = () => {
//   const errorList = Array.from(document.querySelectorAll(this._setting.errorMessageClass));
//   const inputList = Array.from(document.querySelectorAll(this._setting.inputSelector));
//   inputList.forEach((errorElement) => {
//     errorElement.classList.remove(setting.inputErrorClass)
//   })
//   errorList.forEach((errorElement) => {
//     errorElement.textContent = '';
//   })
// }

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }

// const disableSubmitButton = (popup) => {
//   const editBtn = popup.querySelector(this._setting.submitButtonSelector);
//   editBtn.classList.add(this._setting.inactiveButtonClass);
//   editBtn.setAttribute('disabled', '');
// }

// const toggleButtonState = (inputList, buttonElement, setting) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(this._setting.inactiveButtonClass);
//     buttonElement.setAttribute('disabled', '');
//   } else {
//     buttonElement.classList.remove(this._setting.inactiveButtonClass);
//     buttonElement.removeAttribute('disabled', '');

//   }
// }
// }

// enableValidation(setting);
