// Открыть-закрыть попап
const openEditButton = document.querySelector(".profile__button-edit"); // кнопка Редактировать профиль - открыть попап
const closeEditButton = document.querySelector(".popup__edit_button_close"); //закрыть попап
const saveEditButton = document.querySelector(".popup__edit-form"); //выбираем форму, а не отдельную кнопку. Если несколько кнопок, выбираем по id

let popupEditBg = document.querySelector(".popup__edit"); //подключаем бекграунд

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Переменные окна редактирования
let inputName = popupEditBg.querySelector(".popup__field_type_name"); // находим поле ввода Имя
let inputJob = popupEditBg.querySelector(".popup__field_type_job"); //находим поле ввода О себе
let title = document.querySelector(".profile__title");
let subtitle = document.querySelector(".profile__subtitle");

// функция открыть попап
function openEditForm() {
  openPopup(popupEditBg);
  inputName.value = title.textContent; //строке ввода имени присваиваем значение Title
  inputJob.value = subtitle.textContent; // строке ввода профессии присваиваем значение subtitle
}

// функция сабмит формы
function saveEditForm(event) {
  event.preventDefault();
  // Берем значения полей ввода jobInput и nameInput из свойства value и вставляем в элементы title и subtitle с помощью textContent
  title.textContent = inputName.value;
  subtitle.textContent = inputJob.value;
  closePopup(popupEditBg);
}

openEditButton.addEventListener("click", openEditForm);
closeEditButton.addEventListener("click", () => {
  closePopup(popupEditBg);
});
saveEditButton.addEventListener("submit", saveEditForm);

// Форма добавления карточек
const openAddButton = document.querySelector(".profile__button-add"); // кнопка Добавить картинку - открыть попап
const closeAddButton = document.querySelector(".popup__add_button_close"); //закрыть попап
const saveAddButton = document.querySelector(".popup__add-form");
let popupAddBg = document.querySelector(".popup__add"); //подключаем бекграунд
let inputPlace = popupAddBg.querySelector(".popup__field_type_place"); // выбор поля ввода названия места
let inputPlaceLink = popupAddBg.querySelector(".popup__field_type_place-link"); // выбор поля добавления ссылки

openAddButton.addEventListener("click", () => {
  openPopup(popupAddBg);
});
closeAddButton.addEventListener("click", () => {
  closePopup(popupAddBg);
});

// добавить 6 карточек через js
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// переменные формы - добавить места

// переменные контейнера - список мест
const elements = document.querySelector(".elements");
const cardContainer = elements.querySelector(".card");
const template = document.querySelector("#card-template"); // мой template

const createCard = (imagePlace, titlePlace) => {
  const place = template.content.querySelector(".card__item").cloneNode(true); //копирую полное содержимое шаблона
  place.querySelector(".card__image").src = imagePlace;
  place.querySelector(".card__image").alt = titlePlace;
  place.querySelector(".card__title").textContent = titlePlace;
  place.querySelector(".card__trash").addEventListener("click", () => {
    place.remove(); //удалить место
  });

  return place;
};

const renderCards = (imagePlace, titlePlace) => {
  cardContainer.prepend(createCard(imagePlace, titlePlace));
};

initialCards.forEach((card) => {
  renderCards(card.link, card.name);
});

// добавить место
const addPlace = (event) => {
  event.preventDefault();
  const imagePlace = inputPlaceLink.value;
  const titlePlace = inputPlace.value;
  renderCards(imagePlace, titlePlace);

  inputPlaceLink = "";
  inputPlace = "";
  closeAddForm();
};

saveAddButton.addEventListener("submit", addPlace);
