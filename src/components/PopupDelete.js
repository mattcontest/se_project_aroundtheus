import Popup from "./Popup";

export default class PopupDelete extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    // this.popupDeleteModal = this.popupElement;
    // this.handleFormSubmit = handleFormSubmit;
    // this.formElement = this.popupDeleteModal.querySelector(
    //   ".modal__form_delete"
    // );
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleSubmit();
    });
  }

  setSubmitCallback(action) {
    this.handleSubmit = action;
  }
}
