import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    // console.log("PopupwithForm  - PopupElement:", this.popupElement);
    this.popupForm = this.popupElement.querySelector(".modal__form");
    // console.log("PopupwithForm  - PopupElement:", this.popupElement);
    // this.inputList = this.popupElement.querySelectorAll(".modal__input");
    this.button = this.popupForm.querySelector(".modal__btn_type_add");
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

  setEventListeners() {
    //With super we are calling the parent class setEventListeners when available
    // console.log("PopupWithForm.setEventListeners called");
    super.setEventListeners();

    this.popupForm.addEventListener("submit", (e) => {
      // console.log("Addind this for  ->", this.popupElement);
      e.preventDefault();
      //Passing to the handleFormSub,it the _getInputValues (which returns formValues)
      //Passing e to the handleFormSubmit
      this.hanldeFormSubmit(this._getInputValues());
      this.popupForm.reset();
      this.close();
      // this.hanldeFormSubmit(e);
    });
    this._isAdded = true;

    // console.log("Listener added. _isAdded set to true for", this.popupElement);
    // console.log("Check this is added", this._isAdded);
  }
}
