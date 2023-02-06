export default class FormValidator {
  constructor(config, popup) {
    this._form = popup;
    this._config = config;
    this._buttonSave = this._form.querySelector(this._config.submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  //проверяем, валидны ли инпуты
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  //проходим по всем инпутам и проверяем их валидность. Если хоть один невалиден - возвращает true
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  disableSubmitButton() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  enableSubmitButton() {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  // функция проверки валидности и блокировки кнопок, если хоть один инпут не валиден
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  }

  //находим список инпутов и навешиваем обработчики на инпуты
  _setEventListeners() {
    // const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    // const buttonElement = formElement.querySelector(config.submitButtonSelector);

    this._toggleButtonState(this._inputList, this._buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
