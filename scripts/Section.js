export default class Section {
  constructor({items, renderer}, selector) {
    //items - массив данных, которые нужно добавить на страницу при инициализации класса
    //renderer — это функция, которая отвечает за создание и отрисовку данных на странице
    //selector - селектор контейнера, в который нужно добавлять созданные элементы
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}