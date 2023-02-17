export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //открывает попап
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose); //чтобы отслеживать нажатие Esc только когда открыт попап
  }

  //закрывает попап
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //handleEscClose содержит логику закрытия попапа клавишей Esc - проверяем если esc нажат, то попап закрывается
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //setEventListeners добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close")) {
        this.close();
      }
    });
  }
}
