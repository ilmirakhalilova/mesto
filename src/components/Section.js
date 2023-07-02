export default class Section {
  constructor({renderer}, selector) {
    //renderer — это функция, которая отвечает за создание и отрисовку данных на странице
    //selector - селектор контейнера, в который нужно добавлять созданные элементы
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._container.append(this._renderer(item))
    })
  }

  addItem(element) {
    this._container.prepend(element);
  }
}