import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    // console.log("PopupwithForm  - PopupElement:", this.popupElement);
    this.popupForm = this.popupElement.querySelector(".modal__form");
    console.log("Logging this.popupForm form", this.popupForm);
    // this.button = this.popupForm.querySelector(".modal__btn_type_add");
    this.hanldeFormSubmit = handleFormSubmit;
    this.submitButton = this.popupForm.querySelector(".modal__btn");
    this.submitButtonTextContent = this.submitButton.textContent;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this.submitButton.textContent = loadingText;
    } else {
      this.submitButton.textContent = this.submitButtonTextContent;
    }
  }

  _getInputValues() {
    const inputList = this.popupForm.querySelectorAll(".modal__input");
    const formValues = {};
    inputList.forEach((item) => {
      formValues[item.name] = item.value;
    });

    return formValues;
  }

  setInputs(data) {
    const inputList = this.popupForm.querySelectorAll(".modal__input");
    inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setLoading(isLoading) {
    if (isLoading) {
      this.submitButton.textContent = "Saving...";
      this.submitButton.disabled = true;
    } else {
      this.submitButton.textContent = this.submitButtonTextContent;
      this.submitButton.disabled = false;
    }
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
      // console.log(
      //   "Check the element you are about to submit",
      //   this._getInputValues()
      // );
      this.hanldeFormSubmit(this._getInputValues());

      // this.popupForm.reset();
      // this.close();

      // this.hanldeFormSubmit(e);
    });
    this._isAdded = true;

    // console.log("Listener added. _isAdded set to true for", this.popupElement);
    // console.log("Check this is added", this._isAdded);
  }
}
