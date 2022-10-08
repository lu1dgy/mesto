const setting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__input-error_active',
  errorMessageClass: '.popup__input-error'
}

const showInputError = (formElement, inputElement, errorMessage, setting) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(setting.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(setting.errorClass);
};

const hideInputError = (formElement, inputElement, setting) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(setting.inputErrorClass);
  errorElement.classList.remove(setting.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, setting) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, setting);
  } else {
    hideInputError(formElement, inputElement, setting);
  }
};

const setEventListeners = (formElement, setting) => {
  const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
  const button = formElement.querySelector(setting.submitButtonSelector);
  toggleButtonState(inputList, button, setting);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, setting);
      toggleButtonState(inputList, button, setting);
    });
  });
}

const enableValidation = (setting) => {
  const formList = Array.from(document.querySelectorAll(setting.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, setting);
  });
}

const resetValidationErrors = () => {
  const errorList = Array.from(document.querySelectorAll(setting.errorMessageClass));
  const inputList = Array.from(document.querySelectorAll(setting.inputSelector));
  inputList.forEach((errorElement) => {
    errorElement.classList.remove(setting.inputErrorClass)
  })
  errorList.forEach((errorElement) => {
    errorElement.textContent = '';
  })
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const disableSubmitButton = (popup) => {
editBtn = popup.querySelector(setting.submitButtonSelector);
editBtn.classList.add(setting.inactiveButtonClass);
editBtn.setAttribute('disabled', '');
}

const toggleButtonState = (inputList, buttonElement, setting) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(setting.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(setting.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '');

  }
}

enableValidation(setting);
