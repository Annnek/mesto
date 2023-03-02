export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  // В конструкторе: свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса. Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
  // Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.

  //принимает DOM-элемент и добавляет его в контейнер.
  addItem = (item) => {
    this._containerSelector.prepend(item);
  };

  // //Отрисовка каждого отдельного элемента

  renderItems(items) {
    items.reverse().forEach((item) => {
      return this._renderer(item);
    });
  }
}
