//попапы
export const popupEditProfile = ".popup_type_edit";
export const popupAddCard = ".popup_type_add";
export const popupBigImage = ".popup_type_preview";
export const popupEditAvatar = ".popup_type_avatar";

// переменные кнопок открыть-закрыть попап
export const buttonEditProfile = document.querySelector(
  ".profile__button-edit"
);
export const buttonAddPlace = document.querySelector(".profile__button-add");

// переменные форм редактирования профиля
export const formEditProfile = document.querySelector(".popup__edit-form");
export const profileName = document.querySelector(".profile__title");
export const profileJob = document.querySelector(".profile__subtitle");
export const inputName = document.querySelector(".popup__input_type_name");
export const inputJob = document.querySelector(".popup__input_type_job");

// переменные форм добавления карточки
export const formAddCard = document.querySelector(".popup__add-form");
export const cardsContainerSelector = ".card";

// переменные формы редактирования аватара
export const formEditAvatar = document.querySelector(".popup__avatar-form");
export const buttonEditAvatar = document.querySelector(
  ".profile__button-edit-avatar"
);

//config
export const configApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "332cdff8-dddc-4d5c-ae62-82417a8b0fdc",
  },
};
