//import constants
import { initialCards } from "../utils/initialCards.js";
import { validationConfig } from "../utils/validationConfig.js";
import {
  popupEditProfile,
  popupAddCard,
  popupBigImage,
  buttonEditProfile,
  buttonAddPlace,
  buttonCloseList,
  formEditProfile,
  profileName,
  profileJob,
  inputName,
  inputJob,
  formAddCard,
  inputPlaceName,
  inputPlaceLink,
  cardsContainer,
  cardsContainerSelector,
} from "../utils/constants.js";

//import classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

//функции

//создание карточки
function createCard(data) {
  const card = new Card(data, "#card-template", () =>
    popupOpenImage.open(data)
  ).generateCard();
  return card;
}

//рендеринг карточек на странице из обьекта initialCards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = createCard(item);
      cardSection.addItem(newCard);
    },
  },
  cardsContainerSelector
);

cardSection.renderItems();

//передача текста на страницу профиля редактирования полей Имя, О себе
function formValues(value) {
  userInfo.setUserInfo(value.inputName, value.inputJob);
  classEditPopup.close();
}

//Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
const userInfo = new UserInfo(profileName, profileJob);

//функция открытия попапа редактирования профиля
function openEditProfile() {
  const { profileName, profileJob } = userInfo.getUserInfo();
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  validatorFormEditProfile.disableSubmitButton();
  classEditPopup.open();
}

//функция открытия попапа для создания новой карточки
function openAddCard() {
  validatorFormAddPlace.disableSubmitButton();
  classCardPopup.open();
}

// function handleSaveEditForm(event) {
//   event.preventDefault();
//   // Берем значения полей ввода jobInput и nameInput из свойства value и вставляем в элементы title и subtitle с помощью textContent
//   profileName.textContent = inputName.value;
//   profileJob.textContent = inputJob.value;
//   closePopup(popupEditProfile);
// }

// // добавить место по кнопке +
// const handleAddPlace = (event) => {
//   event.preventDefault();
//   const name = inputPlace.value;
//   const link = inputPlaceLink.value;
//   const newCard = createCard({ name, link });
//   if (newCard) renderCard(newCard, cardsContainer);
//   validatorFormAddPlace.disableSubmitButton();
//   closePopup(popupAddPlace);
//   formAddCard.reset();
// };

// Для каждой проверяемой формы создайте экземпляр класса FormValidator - валидация формы редактирования.
const validatorFormEditProfile = new FormValidator(
  validationConfig,
  formEditProfile
);
validatorFormEditProfile.enableValidation();

//валидация формы добавить карточку
const validatorFormAddPlace = new FormValidator(validationConfig, formAddCard);
validatorFormAddPlace.enableValidation();

//Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
const classEditPopup = new PopupWithForm(popupEditProfile, formValues);
const classCardPopup = new PopupWithForm(popupAddCard, (item) => {
  const newCard = createCard(item);
  cardSection.addItem(newCard);
  classCardPopup.close();
});

//создаем экземпляр формы открытия полной картинки - объект класса PopupWithImage
const popupOpenImage = new PopupWithImage(popupBigImage);

classEditPopup.setEventListeners();
classCardPopup.setEventListeners();
popupOpenImage.setEventListeners();

// обработчики

//кнопки открытия попапов
buttonAddPlace.addEventListener("click", () => openAddCard());
buttonEditProfile.addEventListener("click", () => openEditProfile());
