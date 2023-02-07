import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
import { validationConfig } from "./validationConfig.js";

//переменные формы редактирования
const popupEditProfile = document.querySelector(".popup_type_edit"); //подключаем бекграунд
const buttonSaveProfilePopup = document.querySelector(".popup__edit-form"); //выбираем форму, а не отдельную кнопку. Если несколько кнопок, выбираем по id
const inputName = popupEditProfile.querySelector(".popup__input_type_name"); // находим поле ввода Имя
const inputJob = popupEditProfile.querySelector(".popup__input_type_job"); //находим поле ввода О себе
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

// переменные кнопок открыть-закрыть попап
const buttonOpenProfilePopup = document.querySelector(".profile__button-edit"); // кнопка Редактировать профиль - открыть попап
const buttonAddPlacePopup = document.querySelector(".profile__button-add"); // кнопка Добавить картинку - открыть попап
const buttonCloseList = document.querySelectorAll(".popup__close"); //выбираем все элементы закрытия попапов в список

// переменные формы добавления карточек
const buttonSavePlacePopup = document.querySelector(".popup__add-form");
const popupAddPlace = document.querySelector(".popup_type_add"); //подключаем бекграунд
const inputPlace = popupAddPlace.querySelector(".popup__input_type_place"); // выбор поля ввода названия места
const inputPlaceLink = popupAddPlace.querySelector(".popup__input_type_place-link"); // выбор поля добавления ссылки

// переменные контейнера - список мест
const cardsContainer = document.querySelector(".elements");
const cardElement = cardsContainer.querySelector(".card");
const cardAllTemplate = document.querySelector("#card-template"); // мой template
const cardTemplate = cardAllTemplate.content.querySelector(".card__item");

// Переменные попап открытия полноэкранной картинки
const popupPreview = document.querySelector(".popup_type_preview");
const previewImage = popupPreview.querySelector(".popup__preview-image");
const titlePreviewImage = popupPreview.querySelector(".popup__preview-title");

// функции открыть-закрыть попап
function openPopup(popup) {
  document.addEventListener("keydown", handleEscDown); //чтобы отслеживать нажатие Esc только когда открыт попап
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscDown);
}

function handleEscDown(evt) {
  if (evt.code == "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

// функции попап редактирования
function handleOpenEditForm() {
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent; //строке ввода имени присваиваем значение Title
  inputJob.value = profileJob.textContent; // строке ввода профессии присваиваем значение subtitle
}

function handleSaveEditForm(event) {
  event.preventDefault();
  // Берем значения полей ввода jobInput и nameInput из свойства value и вставляем в элементы title и subtitle с помощью textContent
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

//функция создания карточки
function createCard(data) {
  const card = new Card(data, "#card-template", handleAddPlace);
  const cardElement = card.generateCard();
  return cardElement;
}

// const createCard = (imagePlace, titlePlace) => {
//   const place = cardTemplate.cloneNode(true);
//   const cardTemplateImage = place.querySelector(".card__image");
//   const cardTemplateTitle = place.querySelector(".card__title");
//   const buttonTrash = place.querySelector(".card__trash");
//   const buttonLike = place.querySelector(".card__pic-heart");

//   cardTemplateImage.src = imagePlace;
//   cardTemplateImage.alt = titlePlace;
//   cardTemplateTitle.textContent = titlePlace;

//   //удалить место
//   buttonTrash.addEventListener("click", () => {
//     place.remove();
//   });
//   // поставить лайк
//   buttonLike.addEventListener("click", function (event) {
//     event.target.classList.toggle("card__pic-heart_active");
//   });

//   cardTemplateImage.addEventListener("click", () => {
//     openPopup(popupPreview);
//     previewImage.src = imagePlace;
//     previewImage.alt = titlePlace;
//     titlePreviewImage.textContent = titlePlace;
//   });
//   return place;
// };

const renderCard = (imagePlace, titlePlace) => {
  cardElement.prepend(createCard(imagePlace, titlePlace));
};

initialCards.forEach((card) => {
  renderCard(card.link, card.name);
});

// добавить место по кнопке +
const handleAddPlace = (event) => {
  event.preventDefault();
  const imagePlace = inputPlaceLink.value;
  const titlePlace = inputPlace.value;
  renderCard(imagePlace, titlePlace);

  // inputPlaceLink.value = ""; вариант очищения инпутов
  // inputPlace.value = "";
  buttonSavePlacePopup.reset();
  event.submitter.classList.add("popup__save_disabled");
  event.submitter.disabled = true;
  closePopup(popupAddPlace);
};

// //валидация форм
// enableValidation(validationConfig);

// обработчики
buttonOpenProfilePopup.addEventListener("click", handleOpenEditForm);

buttonSaveProfilePopup.addEventListener("submit", handleSaveEditForm);

buttonAddPlacePopup.addEventListener("click", () => {
  openPopup(popupAddPlace);
});

buttonSavePlacePopup.addEventListener("submit", handleAddPlace);

//Сергей, какой шикарный совет по поводу общего обработчика закрытия!!! Спасибо огромное.
// Общий обработчик закрытия попапов. Перебираем методом forEach.
//Чтобы найти элемент с конкретным классом среди родителей есть специальный метод closest. Используем его btn.closest('.popup') - так мы можем найти попап внутри которого находится крестик. Вот его то нам и нужно закрыть.
// в нем же устанавливаем слушатель для закрытия по оверлей
buttonCloseList.forEach((btn) => {
  const popup = btn.closest(".popup");
  popup.addEventListener("mousedown", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup);
    }
  });
  btn.addEventListener("click", () => closePopup(popup));
});
