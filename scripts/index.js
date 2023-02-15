import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from 
import { initialCards } from "../utils/initialCards.js";
import { validationConfig } from "../utils/validationConfig.js";

//переменные формы редактирования
const popupEditProfile = document.querySelector(".popup_type_edit"); //подключаем бекграунд
const formEditProfile = document.querySelector(".popup__edit-form"); //выбираем форму, а не отдельную кнопку. Если несколько кнопок, выбираем по id
const inputName = popupEditProfile.querySelector(".popup__input_type_name"); // находим поле ввода Имя
const inputJob = popupEditProfile.querySelector(".popup__input_type_job"); //находим поле ввода О себе
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

// переменные кнопок открыть-закрыть попап
const buttonOpenProfilePopup = document.querySelector(".profile__button-edit"); // кнопка Редактировать профиль - открыть попап
const buttonAddPlacePopup = document.querySelector(".profile__button-add"); // кнопка Добавить картинку - открыть попап
const buttonCloseList = document.querySelectorAll(".popup__close"); //выбираем все элементы закрытия попапов в список

// переменные формы добавления карточек
const formAddCard = document.querySelector(".popup__add-form");
const popupAddPlace = document.querySelector(".popup_type_add"); //подключаем бекграунд
const inputPlace = popupAddPlace.querySelector(".popup__input_type_place"); // выбор поля ввода названия места
const inputPlaceLink = popupAddPlace.querySelector(".popup__input_type_place-link"); // выбор поля добавления ссылки

// переменные контейнера - список мест
const cardLists = document.querySelector(".elements");
const cardsContainer = document.querySelector(".card");
const cardAllTemplate = document.querySelector("#card-template"); // мой template
const cardImage = cardAllTemplate.content.querySelector(".card__image");

// Переменные попап открытия полноэкранной картинки
// const popupPreview = document.querySelector(".popup_type_preview");
// const previewImage = popupPreview.querySelector(".popup__preview-image");
// const titlePreviewImage = popupPreview.querySelector(".popup__preview-title");

// функции попап редактирования
function handleOpenEditForm() {
  inputName.value = profileName.textContent; //строке ввода имени присваиваем значение Title
  inputJob.value = profileJob.textContent; // строке ввода профессии присваиваем значение subtitle
  validatorFormEditProfile.disableSubmitButton();
  openPopup(popupEditProfile);
}

function handleSaveEditForm(event) {
  event.preventDefault();
  // Берем значения полей ввода jobInput и nameInput из свойства value и вставляем в элементы title и subtitle с помощью textContent
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

// добавить место по кнопке +
const handleAddPlace = (event) => {
  event.preventDefault();
  const name = inputPlace.value;
  const link = inputPlaceLink.value;
  const newCard = createCard({ name, link });
  if (newCard) renderCard(newCard, cardsContainer);
  validatorFormAddPlace.disableSubmitButton();
  closePopup(popupAddPlace);
  formAddCard.reset();
};

//открыть полноразмерную картинку
// function openPreviewImage(name, link) {
//   openPopup(popupPreview);
//   previewImage.src = link;
//   previewImage.alt = name;
//   titlePreviewImage.textContent = name;
// }

//функция создания карточки
function createCard(data) {
  const card = new Card(data, "#card-template", openPreviewImage).generateCard();
  return card;
}

function renderCard(card, cardsContainer) {
  cardsContainer.prepend(card);
}

function renderInitialCards() {
  initialCards.reverse().forEach((value) => {
    const newCard = createCard(value);
    if (newCard) renderCard(newCard, cardsContainer);
  });
}
renderInitialCards();

// Для каждой проверяемой формы создайте экземпляр класса FormValidator.
const validatorFormEditProfile = new FormValidator(validationConfig, formEditProfile);
const validatorFormAddPlace = new FormValidator(validationConfig, formAddCard);

validatorFormEditProfile.enableValidation();
validatorFormAddPlace.enableValidation();

// обработчики
buttonOpenProfilePopup.addEventListener("click", handleOpenEditForm);

formEditProfile.addEventListener("submit", handleSaveEditForm);

buttonAddPlacePopup.addEventListener("click", () => {
  openPopup(popupAddPlace);
});

formAddCard.addEventListener("submit", handleAddPlace);

// cardImage.addEventListener("click", openPreviewImage);

// Общий обработчик закрытия попапов. Перебираем методом forEach.
//Чтобы найти элемент с конкретным классом среди родителей есть специальный метод closest. Используем его btn.closest('.popup') - так мы можем найти попап внутри которого находится крестик. Вот его то нам и нужно закрыть.
// в нем же устанавливаем слушатель для закрытия по оверлей

// buttonCloseList.forEach((btn) => {
//   const popup = btn.closest(".popup");
//   popup.addEventListener("mousedown", (evt) => {
//     if (evt.currentTarget === evt.target) {
//       closePopup(popup);
//     }
//   });
//   btn.addEventListener("click", () => closePopup(popup));
// });
