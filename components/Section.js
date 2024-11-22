class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containterSelector = containerSelector;
  }

  renderItems(items) {
    items.forEach((item) => {
      this.renderer(item);
    });
  }

  addItem(element) {
    this._containterSelector.prepend(element);
  }
}
