// import { initialCards } from "../utils/initialCards.js";
import { validationConfig } from "../utils/validationConfig.js";
import {
  buttonEditProfile,
  buttonAddPlace,
  buttonEditAvatar,
  formEditProfile,
  formAddCard,
  formEditAvatar,
  profileName,
  profileAbout,
  profileAvatar,
  configApi,
} from "../utils/constants.js";
import "./index.css";

//import classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/Api.js";

const api = new Api(configApi);

let userId;

const user = new UserInfo({
  name: profileName,
  about: profileAbout,
  avatar: profileAvatar,
});

// Отрисовка карточек с сервера + отрисовка данных пользователя
Promise.all([api.getUserProfile(), api.getInitialCards()])
  .then(([userProfile, cards]) => {
    user.setUserInfo(userProfile);
    userId = userProfile._id;
    cardList.renderItems(cards);
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

// Загружка карточек с сервера
const cardList = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);

      cardList.addItem(card);
    },
  },
  ".card"
);

// Функция создания карточек по экземпляру класса Card
function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    openFullImage,

    userId,
    async () => {
      try {
        const response = await api.setLike(data._id);
        card.like();
        card.likesCount(response);
      } catch (error) {
        return console.log(`Ошибка: ${error}`);
      }
    },
    async () => {
      try {
        const response = await api.removeLike(data._id);
        card.dislike();
        card.likesCount(response);
      } catch (error) {
        return console.log(`Ошибка: ${error}`);
      }
    },
    () => {
      classPopupWithConfirmation.open(card);
    }
  );

  return card.generateCard();
}

// //открыть полноразмерную картинку
function openFullImage(name, link) {
  classPopupBigImage.open(name, link);
}

// Форма редактирования профиля
async function handleSubmitFormEditProfile(data) {
  try {
    const userProfile = await api.setUserProfile(data);
    user.setUserInfo(userProfile);
  } catch (error) {
    return console.log(`Ошибка: ${error}`);
  }
}

// Форма обновления аватара
async function handleSubmitFormUpdateAvatar(data) {
  try {
    const userProfile = await api.updateUserAvatar(data);
    user.setUserInfo(userProfile);
  } catch (error) {
    return console.log(`Ошибка: ${error}`);
  }
}

// Форма добавления карточек
async function handleSubmitFormAddCard(data) {
  try {
    const newCard = await api.addNewCard(data);
    cardList.addItem(createCard(newCard));
  } catch (error) {
    return console.log(`Ошибка: ${error}`);
  }
}

// Для каждого попапа создавайте свой экземпляр класса PopupWithForm
const classPopupBigImage = new PopupWithImage(".popup_type_preview");

const classAddCard = new PopupWithForm(
  ".popup_type_add",
  handleSubmitFormAddCard
);

const classEditProfile = new PopupWithForm(
  ".popup_type_edit",
  handleSubmitFormEditProfile
);

const classEditAvatar = new PopupWithForm(
  ".popup_type_avatar",
  handleSubmitFormUpdateAvatar
);

const classPopupWithConfirmation = new PopupWithConfirmation(
  ".popup_type_delete-card",
  async (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        card.remove();
        classPopupWithConfirmation.close();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
);

//валидация
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

// обработчики

//кнопки открытия попапов
//открыть форму редактирования профиля
buttonEditProfile.addEventListener(
  "click",
  () => {
    classEditProfile.open();
    classEditProfile.setInputValue(user.getUserInfo());
    validatorFormEditProfile.disableSubmitButton();
  },
  false
);

//открыть форму добавления карточки
buttonAddPlace.addEventListener(
  "click",
  () => {
    validatorFormAddPlace.disableSubmitButton();
    classAddCard.open();
  },
  false
);

//открыть форму редактирования аватара
buttonEditAvatar.addEventListener(
  "click",
  () => {
    validatorFormEditAvatar.disableSubmitButton();
    classEditAvatar.open();
  },
  false
);
