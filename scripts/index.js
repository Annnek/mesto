const openEditButton = document.querySelector(".button_edit"); // кнопка Редактировать профиль - открыть попап

let popupBg = document.querySelector(".popup"); //подключаем бекграунд
let popup = document.querySelector(".popup__form"); //подключаем саму форму
let inputName = document.querySelector(".popup__field_type_name"); // находим поле ввода Имя
let inputJob = document.querySelector(".popup__field_type_job"); //находим поле ввода О себе
const closeEditButton = document.querySelector(".popup_closed"); //закрыть попап
const saveEditButton = document.querySelector(".popup__form"); //выбираем форму, а не отдельную кнопку. Если несколько кнопок, выбираем по id

let title = document.querySelector(".profile__title");
let subtitle = document.querySelector(".profile__subtitle");

//функция открыть попап
function editForm() {
  popupBg.classList.add("popup_opened");
  inputName.value = title.textContent; //строке ввода имени присваиваем значение Title
  inputJob.value = subtitle.textContent; // строке ввода профессии присваиваем значение subtitle
}

function closeEdit() {
  popupBg.classList.remove("popup_opened");
}

function saveForm(event) {
  event.preventDefault();
  // Берем значения полей ввода jobInput и nameInput из свойства value и вставляем в элементы title и subtitle с помощью textContent
  title.textContent = inputName.value;
  subtitle.textContent = inputJob.value;

  closeEdit();
}

openEditButton.addEventListener("click", editForm);
closeEditButton.addEventListener("click", closeEdit);
saveEditButton.addEventListener("submit", saveForm);
