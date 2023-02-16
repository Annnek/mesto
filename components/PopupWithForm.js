import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  // собирает данные всех полей формы.
  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  //Перезаписывает родительский метод, добавляет обработчик клика иконке закрытия, добавляет обработчик сабмита формы.
  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", () => {
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  };

  //Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._form.reset();
  }
}
