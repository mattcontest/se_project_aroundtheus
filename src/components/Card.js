export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this.name = name;
    this.link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    // alert("You did it!");
    this._cardElement
      .querySelector(".card__button_delete")
      .addEventListener("click", () => {
        // alert(this._name + "It's working");
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".card__button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ link: this.link, name: this.name });
    });
  }

  _handleLikeIcon() {
    // this._cardElement
    //   .querySelector(".card__button")
    //   .classList.toggle("card__button_active");
    this._likeButton.classList.toggle("card__button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    //Root Document
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true).firstElementChild;

    this._likeButton = this._cardElement.querySelector(".card__button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__button_delete"
    );

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");

    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._cardTitle.textContent = this.name;

    // console.log(this._cardElement);

    //get the card view
    //set event listeners
    this._setEventListeners();
    //retur the card

    return this._cardElement;
  }
}
