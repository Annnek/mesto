// Функции создания из массива, удаления, лайка карточек
export default class Card {
  constructor(data, templateSelector, handleClickCard) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleClickCard = handleClickCard;
  }

  generateCard = () => {
    this._cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
    this._title = this._cardElement.querySelector(".card__title");
    this._image = this._cardElement.querySelector(".card__image");
    this._trash = this._cardElement.querySelector(".card__trash");
    this._like = this._cardElement.querySelector(".card__pic-heart");

    this._fillCard();
    this._setEventHandlers();
    return this._cardElement;
  };

  _deleteCard = () => {
    this._trash.closest(".card__item").remove();
  };

  _toggleCardLike = () => {
    this._like.classList.toggle("card__pic-heart_active");
  };

  _setEventHandlers = () => {
    this._image.addEventListener("click", () => this._handleClickCard(this._name, this._link));
    this._like.addEventListener("click", () => this._toggleCardLike());
    this._trash.addEventListener("click", () => this._deleteCard());
  };

  _fillCard = () => {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
  };
}
