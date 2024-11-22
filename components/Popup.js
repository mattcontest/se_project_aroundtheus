export default class Popup {
  constructor({ popupSelector }) {
    console.log("Popupselector received in Poupup", popupSelector);
    this.popupElement = document.querySelector(popupSelector);
    console.log("Popup Element:", this.popupElement);
    console.log("Check this", document.querySelector("#edit-modal"));
  }

  open() {
    //opens popup
    this.popupElement.classList.add("modal_open");
  }

  close() {
    //closes popup
    this.popupElement.remove("modal_open");
  }

  _handleEscClose(evt) {
    //listens for escape button
    if (evt.key === "Escape") {
      const openModal = document.querySelector(".modal_open");
      this.close(openModal);
    }
  }

  setEventListeners() {
    //setse vent listeners
  }
}
