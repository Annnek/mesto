//формы
export const formEditProfile = document.querySelector(".popup__edit-form");
export const formAddCard = document.querySelector(".popup__add-form");
export const formEditAvatar = document.querySelector(".popup__avatar-form");

// переменные кнопок открыть-закрыть попап
export const buttonEditProfile = document.querySelector(
  ".profile__button-edit"
);
export const buttonAddPlace = document.querySelector(".profile__button-add");
export const buttonEditAvatar = document.querySelector(
  ".profile__button-edit-avatar"
);

// переменные форм редактирования профиля
export const profileName = document.querySelector(".profile__title");
export const profileAbout = document.querySelector(".profile__subtitle");
export const profileAvatar = document.querySelector(".profile__avatar");

//config
export const configApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "332cdff8-dddc-4d5c-ae62-82417a8b0fdc",
    "Content-Type": "application/json",
  },
};
