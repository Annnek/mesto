//import constants
import { initialCards } from "../utils/initialCards.js";
import { validationConfig } from "../utils/validationConfig.js";
import {
  popupEditProfile,
  popupAddCard,
  popupBigImage,
  popupEditAvatar,
  buttonEditProfile,
  buttonAddPlace,
  buttonEditAvatar,
  formEditProfile,
  profileName,
  profileJob,
  inputName,
  inputJob,
  formAddCard,
  formEditAvatar,
  cardsContainerSelector,
} from "../utils/constants.js";
import "./index.css";

//import classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

//функции

//создание карточки
function createCard(item) {
  const card = new Card(item, "#card-template", () =>
    classOpenImage.open(item)
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

//открыть полноразмерную картинку
// function openFullImage(item) {
//   popupOpenImage.open(item.name, item.link);
// }

//редактирование профиля
//Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
const userInfo = new UserInfo({
  name: profileName,
  job: profileJob,
});

//передача текста на страницу профиля редактирования полей Имя, О себе
function formValues(value) {
  userInfo.setUserInfo(value.inputName, value.inputJob);
  classEditProfile.close();
}

//функция открытия попапа редактирования профиля
function openEditProfile() {
  const { name, job } = userInfo.getUserInfo();
  inputName.value = name;
  inputJob.value = job;
  validatorFormEditProfile.disableSubmitButton();
  classEditProfile.open();
}

//функция открытия попап редактирования аватара профиля
function openEditAvatar() {
  validatorFormEditAvatar.disableSubmitButton();
  popupEditAvatar.open();
}

//Добавление карточки
//функция открытия попапа для создания новой карточки
function openAddCard() {
  validatorFormAddPlace.disableSubmitButton();
  classAddCard.open();
}

// Для каждой проверяемой формы создайте экземпляр класса FormValidator - валидация формы редактирования.
const validatorFormEditProfile = new FormValidator(
  validationConfig,
  formEditProfile
);
validatorFormEditProfile.enableValidation();

//валидация формы редактирования аватара
const validatorFormEditAvatar = new FormValidator(
  validationConfig,
  formEditAvatar
);
validatorFormEditAvatar.enableValidation();

//валидация формы добавить карточку
const validatorFormAddPlace = new FormValidator(validationConfig, formAddCard);
validatorFormAddPlace.enableValidation();

//Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
const classEditProfile = new PopupWithForm(popupEditProfile, formValues);
const classAddCard = new PopupWithForm(popupAddCard, (item) => {
  const newCard = createCard(item);
  cardSection.addItem(newCard);
  classAddCard.close();
});
const classEditAvatar = new PopupWithForm(popupEditAvatar, () => {
  const newAvatar = updateUserAvatar(data);
  currentUser.setUserInfo(newAvatar);
  classEditAvatar.close();
});

//создаем экземпляр формы открытия полной картинки - объект класса PopupWithImage
const classOpenImage = new PopupWithImage(popupBigImage);

// обработчики

//кнопки открытия попапов
buttonEditProfile.addEventListener("click", () => openEditProfile());
buttonAddPlace.addEventListener("click", () => openAddCard());
buttonEditAvatar.addEventListener("click", () => openEditAvatar());

classEditProfile.setEventListeners();
classAddCard.setEventListeners();
classOpenImage.setEventListeners();
classEditAvatar.setEventListeners();
