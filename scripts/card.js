// Функции создания из массива, удаления, лайка карточек
export default class Card {
  constructor(data, templateSelector, clickImageHandle) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._clickImageHandle = clickImageHandle;
  }

  generateCard = () => {
    this._cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
    this._like = this._cardElement.querySelector(".element__like-button");
    this._title = this._cardElement.querySelector(".element__title");
    this._mask = this._cardElement.querySelector(".element__mask");
    this._trash = this._cardElement.querySelector(".element__trash");

    this._fillCard();
    this._setEventHandlers();
    return this._cardElement;
  };

  _likeCard = () => {
    this._like.classList.toggle("card__pic-heart_active");
  };

  _deleteCard = () => {
    this._trash.closest(".element").remove();
  };

  _setEventHandlers = () => {
    this._trash.addEventListener("click", () => this._deleteCard());
    this._like.addEventListener("click", () => this._likeCard());
    this._mask.addEventListener("click", () => this._clickImageHandle(this._name, this._link));
  };

  _fillCard = () => {
    this._mask.src = this._link;
    this._mask.alt = this._name;
    this._title.textContent = this._name;
  };
}

const createCard = (imagePlace, titlePlace) => {
  const place = cardTemplate.cloneNode(true);
  const cardTemplateImage = place.querySelector(".card__image");
  const cardTemplateTitle = place.querySelector(".card__title");
  const buttonTrash = place.querySelector(".card__trash");
  const buttonLike = place.querySelector(".card__pic-heart");

  cardTemplateImage.src = imagePlace;
  cardTemplateImage.alt = titlePlace;
  cardTemplateTitle.textContent = titlePlace;

  //удалить место
  buttonTrash.addEventListener("click", () => {
    place.remove();
  });

  cardTemplateImage.addEventListener("click", () => {
    openPopup(popupPreview);
    previewImage.src = imagePlace;
    previewImage.alt = titlePlace;
    titlePreviewImage.textContent = titlePlace;
  });
  return place;
};
