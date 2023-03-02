import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = [...this._form.querySelectorAll(".popup__input")];
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      const replacementText = event.submitter.textContent;
      // Смена текста кнопки при сохранение данных
      event.submitter.textContent = "Сохранение...";
      this._handleSubmitForm(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          event.submitter.textContent = replacementText;
        });
    });
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setInputValue(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
