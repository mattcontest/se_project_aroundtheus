export default class Card {
  constructor(
    { name, link, id, owner },
    cardSelector,
    handleImageClick
    // deleteCardModal
  ) {
    this.name = name;
    this.link = link;
    this.id = id;
    this.owner = owner;
    // console.log("Are you undefined", this.id);
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    // this._deleteCardModal = deleteCardModal;
  }

  getId() {
    return this.id;
  }

  _setEventListeners() {
    // this._cardElement
    //   .querySelector(".card__button_delete")

    this._deleteButton.addEventListener("click", () => {
      // alert(this._name + "It's working");
      this._handleDeleteCard();
      // console.log("trying here");
      // this._deleteCardModal(this.id, this);
    });

    // this._cardElement
    //   .querySelector(".card__button")

    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ link: this.link, name: this.name, id: this.id });
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
    this._cardImage.alt = this.id;
    this._cardTitle.textContent = this.name;
    // console.log("CardId in getview", this.getId());

    // console.log(this._cardElement);
    // console.log("check here", this._id);

    //get the card view
    //set event listeners
    this._setEventListeners();
    //retur the card

    return this._cardElement;
  }
}
