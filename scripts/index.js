const initialCards = [
  {
    name: "Yosemite Valley",
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
const editProfileModal = document.querySelector("#edit-modal");
const profileModalCloseButton = editProfileModal.querySelector(".modal__close");
const profileNameInput = document.querySelector("#title__form");
const profileSubtitleInput = document.querySelector("#description__form-edit");
const profileEditSaveButton = editProfileModal.querySelector(".modal__btn");

// Image Preview Modal
const picturePreviewModal = document.querySelector("#picture-modal");
const previewCardImage = document.querySelector(".modal__image");
const previewCardTitle = document.querySelector(".modal__image-title");
const previewCloseButton = document.querySelector(".modal__close_preview");

// Add Modal Elements
const addModal = document.querySelector("#add-modal");
const addButton = document.querySelector(".profile__add-button");
const addCloseButton = addModal.querySelector(".modal__close");

//Form Data
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

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
}

//For the reviewer: I attempted to replicate the testing environment to simulate
//the issue you're experiencing, but I wasn't able to reproduce the same error.
function closePopup(modal) {
  modal.classList.remove("modal_open");
  console.log("testing");
}

function openPopup(modal) {
  modal.classList.add("modal_open");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  //Select image for the preview
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  //Selecting all Like Buttons after they are prepended
  const likeButton = cardElement.querySelector(".card__button");
  //Select delete button
  const deleteButton = cardElement.querySelector(".card__button_delete");

  cardImage.addEventListener("click", () => {
    previewCardImage.src = cardImage.src;
    previewCardTitle.textContent = cardData.name;
    previewCardImage.alt = cardData.name;
    console.log("previewcardimage src", cardImage.src);
    console.log("previewcardimage src", cardData.name);

    openPopup(picturePreviewModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  return cardElement;
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
}

/* ------------------------------------------------------------------------------------------- */
/*                                   Event Listeners                                           */
/* ------------------------------------------------------------------------------------------- */

profileModalCloseButton.addEventListener("click", () =>
  closePopup(editProfileModal)
);

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  openPopup(editProfileModal);
});

profileEditSaveButton.addEventListener("click", () => {
  closePopup(editProfileModal);
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

// Initializing all cards through getCardElement
initialCards.forEach((cardData) => {
  renderCard(cardData);
});

addButton.addEventListener("click", () => openPopup(addModal));

addCloseButton.addEventListener("click", () => closePopup(addModal));

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

previewCloseButton.addEventListener("click", () =>
  closePopup(picturePreviewModal)
);
