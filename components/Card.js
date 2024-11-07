export default class Card {
  constructor({ name, link }, cardSelector) {
    this.name = name;
    this.link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    // alert("You did it!");
    //.card__image
    // this._cardElement.querySelector(".card__image").src = this.link;
    // this._cardElement.querySelector(".card__image").alt = this.name;
    // this._cardElement.querySelector(".card__title").textContet = this.name;

    this._cardElement
      .querySelector(".card__button_delete")
      .addEventListener("click", () => {
        alert(this._name + "It's working");
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".card__button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__button")
      .classList.toggle("card__button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true).firstElementChild;

    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");
    cardImage.src = this.link;
    cardImage.alt = this.name;
    cardTitle.textContent = this.name;

    console.log(this._cardElement);

    //get the card view
    //set event listeners
    this._setEventListeners();
    //retur the card

    return this._cardElement;
  }
}
