import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", () => {
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  };

  close() {
    super.close();
    this._form.reset();
  }
}
