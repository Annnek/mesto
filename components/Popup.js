export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this)
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

  //handleEscClose содержит логику закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    //Проверяем нажата ли клавиша Escape
    if(evt.key === 'Escape') {
        //если кнопка esc нажата - попап закрывается
    this.close();
    }
  }

  //setEventListeners добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
          this.close();
        }
      })
  }

}





  }