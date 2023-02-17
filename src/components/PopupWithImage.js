import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupBigImage = this._popup.querySelector(".popup__preview-image");
    this._popupImageTitle = this._popup.querySelector(".popup__preview-title");
  }

  //вставляет в попап картинку с src изображения и подписью к картинке.
  open = (item) => {
    super.open();
    this._popupImageTitle.textContent = item.name;
    this._popupBigImage.alt = item.name;
    this._popupBigImage.src = item.link;
  };
}
