const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  activeButtonClass: "popup__save_valid",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//переменные формы редактирования
const popupEditProfile = document.querySelector(".popup_edit"); //подключаем бекграунд
const inputName = popupEditProfile.querySelector(".popup__input_type_name"); // находим поле ввода Имя
const inputJob = popupEditProfile.querySelector(".popup__input_type_job"); //находим поле ввода О себе
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

// переменные кнопок открыть-закрыть попап
const buttonOpenProfilePopup = document.querySelector(".profile__button-edit"); // кнопка Редактировать профиль - открыть попап
const buttonCloseProfilePopup = document.querySelector(".popup__close-edit"); //закрыть попап
const buttonSaveProfilePopup = document.querySelector(".popup__edit-form"); //выбираем форму, а не отдельную кнопку. Если несколько кнопок, выбираем по id

// переменные формы добавления карточек
const buttonAddPlacePopup = document.querySelector(".profile__button-add"); // кнопка Добавить картинку - открыть попап
const buttonClosePlacePopup = document.querySelector(".popup__close-add"); //закрыть попап
const buttonSavePlacePopup = document.querySelector(".popup__add-form");
const popupAddPlace = document.querySelector(".popup_add"); //подключаем бекграунд
const inputPlace = popupAddPlace.querySelector(".popup__input_type_place"); // выбор поля ввода названия места
const inputPlaceLink = popupAddPlace.querySelector(".popup__input_type_place-link"); // выбор поля добавления ссылки

// переменные контейнера - список мест
const cardsContainer = document.querySelector(".elements");
const cardElement = cardsContainer.querySelector(".card");
const cardAllTemplate = document.querySelector("#card-template"); // мой template
const cardTemplate = cardAllTemplate.content.querySelector(".card__item");

// Переменные попап открытия полноэкранной картинки
const popupPreview = document.querySelector(".popup-preview");
const previewImage = popupPreview.querySelector(".popup-preview__image");
const titlePreviewImage = popupPreview.querySelector(".popup-preview__title");
const buttonClosePreviewPopup = popupPreview.querySelector(".popup-preview__button-close");

// функции открыть-закрыть попап
function openPopup(popup) {
  document.addEventListener("keydown", handleEscDown); //чтобы отслеживать нажатие Esc только когда открыт попап
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.addEventListener("keydown", handleEscDown);
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

// Функции создания из массива, удаления, лайка карточек
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
  // поставить лайк
  buttonLike.addEventListener("click", function (event) {
    event.target.classList.toggle("card__pic-heart_active");
  });

  cardTemplateImage.addEventListener("click", () => {
    openPopup(popupPreview);
    previewImage.src = imagePlace;
    previewImage.alt = titlePlace;
    titlePreviewImage.textContent = titlePlace;
  });
  return place;
};

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
  closePopup(popupAddPlace);
};

//валидация форм
enableValidation(validationConfig);

// обработчики
buttonOpenProfilePopup.addEventListener("click", handleOpenEditForm);
buttonCloseProfilePopup.addEventListener("click", () => {
  closePopup(popupEditProfile);
});
buttonSaveProfilePopup.addEventListener("submit", handleSaveEditForm);

buttonAddPlacePopup.addEventListener("click", () => {
  openPopup(popupAddPlace);
});
buttonClosePlacePopup.addEventListener("click", () => {
  closePopup(popupAddPlace);
});
buttonSavePlacePopup.addEventListener("submit", handleAddPlace);

// Закрыть попап превью фото мест
buttonClosePreviewPopup.addEventListener("click", () => {
  closePopup(popupPreview);
});

//закрыть попапы кликом по оверлею
popupEditProfile.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupEditProfile);
  }
});

popupAddPlace.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupAddPlace);
  }
});

popupPreview.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupPreview);
  }
});
