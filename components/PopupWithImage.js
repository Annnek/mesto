import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupBigImage = this._popup.querySelector(".popup__preview-image");
    this._popupImageTitle = this._popup.querySelector(".popup__preview-title");
  }

  //вставляет в попап картинку с src изображения и подписью к картинке.
  open = (title, image) => {
    super.open();
    this._popupImageTitle.textContent = title;
    this._popupBigImage.alt = title;
    this._popupBigImage.src = image;
  };
}
