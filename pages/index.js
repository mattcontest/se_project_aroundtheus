import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yasmine Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* ------------------------------------------------------------------------------------------- */
/*                                   Elements                                                  */
/* ------------------------------------------------------------------------------------------- */

//Profile Elements
const profileName = document.querySelector(".profile__name");
const profileEditButton = document.querySelector("#profile--edit-button");
const profileSubtitle = document.querySelector(".profile__subtitle");
//Modal Elements
const editModal = document.querySelector("#edit-modal");
const editModalContainer = editModal.querySelector(".modal__container");
const editProfileModal = document.querySelector("#edit-modal");
const profileModalCloseButton = editProfileModal.querySelector(".modal__close");
const profileNameInput = document.querySelector("#title__form");
const profileSubtitleInput = document.querySelector("#description__form-edit");
const profileEditSaveButton = editProfileModal.querySelector(".modal__btn");

// Image Preview Modal
const picturePreviewModal = document.querySelector("#picture-modal");
const modalPictureContainer = picturePreviewModal.querySelector(
  ".modal__image-container"
);
const previewCardImage = document.querySelector(".modal__image");
const previewCardTitle = document.querySelector(".modal__image-title");
const previewCloseButton = document.querySelector(".modal__close_preview");

// Add Modal Elements
const addModal = document.querySelector("#add-modal");
const addModalContainer = addModal.querySelector(".modal__container");
const addButton = document.querySelector(".profile__add-button");
const addCloseButton = addModal.querySelector(".modal__close");

//Edit Modal Form
const editModalForm = document.querySelector(".modal__form");

//Form Data
const addCardButton = document.querySelector(".modal__btn_type_add");
const addCardForm = document.querySelector(".modal__form_card");
const cardTitleForm = addModal.querySelector(".modal__input_type_title");
const cardImageForm = addModal.querySelector(".modal__input_type_image");

const profileEditForm = document.forms["profile-form"];
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

const cardList = document.querySelector(".cards__list");

/* ------------------------------------------------------------------------------------------- */
/*                                   Default Values                                            */
/* ------------------------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------------------------- */
/*                                   Functions                                                 */
/* ------------------------------------------------------------------------------------------- */

function createCard(data) {
  const card = new Card(data, "#card__template", handleImageClick);
  return card.getView();
}

function renderCard(cardData) {
  // const cardElement = getCardElement(cardData);
  // const card = new Card(cardData, "#card__template");
  const cardElement = createCard(cardData);
  // const cardElement = card.getView();
  cardList.prepend(cardElement);
}

function closePopup(modal) {
  modal.classList.remove("modal_open");
  document.removeEventListener("keydown", handleEscapeKey);
}

function openPopup(modal) {
  modal.classList.add("modal_open");
  //Check this
  document.addEventListener("keydown", handleEscapeKey);
}

function handleImageClick(data) {
  previewCardImage.src = data.link;
  previewCardImage.alt = data.name;
  previewCardTitle.textContent = data.name;
  openPopup(picturePreviewModal);
}

/* ------------------------------------------------------------------------------------------- */
/*                                  Event Handlers                                             */
/* ------------------------------------------------------------------------------------------- */

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closePopup(editProfileModal);
  e.target.reset();
  console.log("Fire in the hall!");
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const titleCard = cardTitleForm.value;
  const linkCard = cardImageForm.value;
  const cardElement = { name: titleCard, link: linkCard };
  renderCard(cardElement);
  closePopup(addModal);
  e.target.reset();
  addCardFormValidator.disableSubmitButton();
  addCardFormValidator.resetValidation();
}

/* ------------------------------------------------------------------------------------------- */
/*                                   Event Listeners                                           */
/* ------------------------------------------------------------------------------------------- */

profileModalCloseButton.addEventListener("click", () =>
  closePopup(editProfileModal)
);

//Implemented logic to close modal when clicking otuside of the Modal Container with its attributes
editModal.addEventListener("click", (event) => {
  if (!editModalContainer.contains(event.target)) {
    closePopup(editProfileModal);
  }
});

//Implemented logic to close modal when clicking otuside of the Modal Container with its attributes

addModal.addEventListener("click", (event) => {
  if (!addModalContainer.contains(event.target)) {
    closePopup(addModal);
  }
});

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_open");
    closePopup(openModal);
  }
}

//Implemented logic to close modal when clicking otuside of the Modal Container with its attributes
picturePreviewModal.addEventListener("click", (event) => {
  if (!modalPictureContainer.contains(event.target)) {
    closePopup(picturePreviewModal);
  }
});

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  // editCardFormValidator.resetValidation();
  openPopup(editProfileModal);
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

// Initializing all cards through getCardElement
initialCards.forEach((cardData) => {
  renderCard(cardData);
});

addButton.addEventListener("click", () => {
  openPopup(addModal);
});

addCloseButton.addEventListener("click", () => closePopup(addModal));

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

previewCloseButton.addEventListener("click", () =>
  closePopup(picturePreviewModal)
);

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__btn",
  inactiveButtonClass: "modal__btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addCardFormValidator = new FormValidator(config, addCardForm);
const editCardFormValidator = new FormValidator(config, editModalForm);

addCardFormValidator.enableValidation();
editCardFormValidator.enableValidation();
