import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, closeButtonSelector) {
    super(popupSelector, closeButtonSelector);
    this._popupBigImage = this._popup.querySelector(".popup__preview-image");
    this._popupImageTitle = this._popup.querySelector(".popup__preview-title");
  }

  //вставляет в попап картинку с src изображения и подписью к картинке.
  open(name, link) {
    this._popupImageTitle.textContent = name;
    this._popupBigImage.alt = name;
    this._popupBigImage.src = link;
    super.open();
  }
}
