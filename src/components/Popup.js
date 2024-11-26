export default class Popup {
  constructor({ popupSelector }) {
    console.log("Popupselector received in Poupup", popupSelector);
    this.popupElement = document.querySelector(popupSelector);
    console.log("Popup Element:", this.popupElement);
    console.log("Check this", document.querySelector("#edit-modal"));
    //Binding handleEscClose to ensure its functionaliting throught PopupWithForm
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    //opens popup
    this.popupElement.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    //closes popup
    this.popupElement.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    //listens for escape button
    if (evt.key === "Escape") {
      // const openModal = document.querySelector(".modal_open");
      // this.close(openModal);
      this.close();
    }
  }

  setEventListeners() {
    //sets event listeners
    const closeButton = this.popupElement.querySelector(".modal__close");
    closeButton.addEventListener("click", () => this.close());
  }
}
