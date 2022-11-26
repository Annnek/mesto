const openEditButton = document.querySelector(".button_edit"); // кнопка Редактировать профиль - открыть попап

let popupBg = document.querySelector(".popup"); //подключаем бекграунд
let popup = document.querySelector(".popup__form"); //подключаем саму форму
let inputName = document.querySelector(".popup__field_type_name"); // находим поле ввода Имя
let inputJob = document.querySelector(".popup__field_type_job"); //находим поле ввода О себе
const closeEditButton = document.querySelector(".popup_closed"); //закрыть попап
const saveEditButton = document.querySelector(".popup__form"); //выбираем форму, а не отдельную кнопку. Если несколько кнопок, выбираем по id

let title = document.querySelector(".profile__title");
let subTitle = document.querySelector(".profile__subtitle");

//функция открыть попап
function editForm() {
  // event.preventDefault(); // Отменяет дефолтное поведение браузера
  popupBg.classList.add("popup_opened");
  inputName.value = title.textContent;
  inputJob.value = subTitle.textContent;
}

function closeEdit() {
  popupBg.classList.remove("popup_opened");
}

function saveForm(event) {
  event.preventDefault();
  title.textContent = inputName.value;
  subTitle.textContent = inputJob.value;

  closeEdit();
}

openEditButton.addEventListener("click", editForm);
closeEditButton.addEventListener("click", closeEdit);
saveEditButton.addEventListener("submit", saveForm);
