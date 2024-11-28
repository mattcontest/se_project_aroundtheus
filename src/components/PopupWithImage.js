import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    // console.log("Log this", popupSelector);
    super({ popupSelector });
    // console.log(
    //   "Log this after Super which is basically calling Popup.constructor",
    //   popupSelector
    // );
    this._image = this.popupElement.querySelector(".modal__image");
    this._cardTitle = this.popupElement.querySelector(".modal__image-title");
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._cardTitle.textContent = data.name;
    super.open();
  }
}
