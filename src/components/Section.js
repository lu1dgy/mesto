export default class Section {

  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  clear() {
    this._container.innerHTML = '';
  }

  addItemUser(element) {
    this._container.prepend(element);
  }
  //чтобы при обновлении страницы карточка не уходила вниз
  addItemServer(element) {
    this._container.append(element);
  }
}
