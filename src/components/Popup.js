export default class Popup {
  constructor(selector) {
    //Находим указанный popup
    this._popup = document.querySelector(selector);
    //Находим на popup кнопку submit
    this._button = this._popup.querySelector(".popup__close");
    //Биндим к функции this._handleSubmit параметр this
    this._clickCloseButton = this._handleSubmit.bind(this);
    //Биндим к функции this._handleEscClose параметр this
    this._clickEscClose = this._handleEscClose.bind(this);
    //Биндим к функции this._handleClose параметр this
    this._clickClose = this._handleClose.bind(this);
    //Устанавливаем (однократно) обработчик нажатия на кнопку крестика
    this._button.addEventListener("click", this._clickCloseButton);
  }

  open() {
    //Сначала устанавливаем обработчики событий
    this.setEventListeners();
    //А только после показываем popup
    this._popup.classList.add("popup_opened");
  }

  close() {
    //Сначала скрываем popup
    this._popup.classList.remove("popup_opened");
    //И только после этого удалаяем обработчики событий
    this.delEventListeners();
  }

  _handleSubmit() {
    //Просто вызываем закрытие
    this.close();
  }

  _handleEscClose(evt) {
    //Проверяем нажата ли клавиша Escape
    if (evt.key === "Escape") {
      //По нажатию на клавишу Escape вызываем закрытие
      this.close();
    }
  }

  _handleClose(evt) {
    //Зачем то проверяем наличие класса popup_opened у target
    if (evt.target.classList.contains("popup_opened")) {
      //При наличии вызываем закрытие
      this.close();
    }
  }

  setEventListeners() {
    //Установка обработчиков от popup на document
    document.addEventListener("keydown", this._clickEscClose);
    document.addEventListener("mouseup", this._clickClose);
  }

  delEventListeners() {
    //Снятие обработчиков от popup на document
    document.removeEventListener("keydown", this._clickEscClose);
    document.removeEventListener("mouseup", this._clickClose);
  }
}

// //открывает попап
// open() {
//   this._popup.classList.add("popup_opened");
//   document.addEventListener("keydown", this._handleEscClose); //чтобы отслеживать нажатие Esc только когда открыт попап
// }

// //закрывает попап
// close() {
//   this._popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", this._handleEscClose);
// }

// //handleEscClose содержит логику закрытия попапа клавишей Esc - проверяем если esc нажат, то попап закрывается
// _handleEscClose(evt) {
//   if (evt.key === "Escape") {
//     this.close();
//   }
// }

// //setEventListeners добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
// setEventListeners() {
//   this._popup.addEventListener("mousedown", (evt) => {
//     if (
//       evt.target.classList.contains("popup_opened") ||
//       evt.target.classList.contains("popup__close")
//     ) {
//       this.close();
//     }
//   });
//   // }
// }
