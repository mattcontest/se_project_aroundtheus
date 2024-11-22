import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    console.log("PopupwithForm  - PopupElement:", this.popupElement);
    this.popupForm = this.popupElement.querySelector(".modal__form");
    console.log("PopupwithForm  - PopupElement:", this.popupElement);

    this.hanldeFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputList = this.popupForm.querySelectorAll(".modal__input");
    const formValues = {};
    inputList.forEach((item) => {
      formValues[item.name] = item.value;
    });

    return formValues;
  }

  close() {
    this.popupForm.reset();
    super.close();
  }

  setEventListeners() {
    //With super we are calling the parent class setEventListeners when available
    super.setEventListeners();
    this.popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      //Passing to the handleFormSub,it the _getInputValues (which returns formValues)
      this.hanldeFormSubmit(this._getInputValues());
    });
  }
}
