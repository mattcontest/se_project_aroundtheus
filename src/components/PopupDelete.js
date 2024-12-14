import Popup from "./Popup";

export default class PopupDelete extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });

    this._formElement = this.popupElement.querySelector(".modal__form_delete");
  }

  setSubmitCallback(submitFunction) {
    this._submitFunction = submitFunction;
  }

  setEventListeners() {
    console.log("Inside setEventListeners of Popupdelete");
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      //   this.setSubmitCallback();
      //Just to ensure that this._submitFunction has been set
      if (this._submitFunction) {
        this._submitFunction();
      } else {
        console.error("submitFunction not set yet");
      }
    });

    super.setEventListeners();
  }
}
