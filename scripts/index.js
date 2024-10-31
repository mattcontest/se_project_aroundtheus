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
const editModal = document.querySelector("#edit-modal");
const editModalContainer = editModal.querySelector(".modal__container");
// const modalImageContainer = document.querySelector(".modal__image-container");
// const modalConteiner = document.querySelector(".modal__container");
// const modalForm = document.querySelector(".modal__form");
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
const openModals = document.querySelector(".modal__open");

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
  //Check this
  checkAndRemoveEscListener();
  console.log("testing");
}

function openPopup(modal) {
  modal.classList.add("modal_open");
  //Check this
  document.addEventListener("keydown", handlerEscapeKey);
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

// editModal.addEventListener("click", () => closePopup(editProfileModal));
// addModal.addEventListener("click", () => closePopup(addModal));

//Implemented logic to close modal when clicking otuside of the Modal Container with its attributes
editModal.addEventListener("click", (event) => {
  // if (event.target !== modalConteiner && event.target !== modalForm) {
  //   console.log("fire test!");
  //   closePopup(editProfileModal);
  // }
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

// addModalContainer.addEventListener("keydown", function (evt) {
//   if (evt.key === "Escape") {
//     closePopup(addModal);
//   }
// });

// addModal.addEventListener("keydown", function (evt) {
//   // console.log("from here", evt.key);
//   if (evt.key === "Escape") {
//     console.log("Clicking escaping");
//     closePopup(addModal);
//   }
// });

//Check this
function handlerEscapeKey(evt) {
  if (evt.key === "Escape") {
    closePopup(editModal);
    closePopup(addModal);
    closePopup(picturePreviewModal);
    checkAndRemoveEscListener();
  }
}

//Check this

//Here we check if all/one of the modals are not open and if not then we remove to all escape key listener
function checkAndRemoveEscListener() {
  if (
    !editModal.classList.contains(".modal__open") ||
    !addModal.classList.contains(".modal__open") ||
    !picturePreviewModal.classList.contains(".modal__open")
  ) {
    document.removeEventListener("keydown", handlerEscapeKey);
    console.log("Removed Event Listener for key-escape");
  }
}

//We create an eventlistener looking for they keydown -- Escape
// document.addEventListener("keydown", function (evt) {
//   console.log("works?");
//   if (evt.key === "Escape") {
//     closePopup(editModal);
//     closePopup(addModal);
//     closePopup(picturePreviewModal);
//     // console.log("inside the escape");
//   }
// });

//Implemented logic to close modal when clicking otuside of the Modal Container with its attributes
picturePreviewModal.addEventListener("click", (event) => {
  if (!modalPictureContainer.contains(event.target)) {
    closePopup(picturePreviewModal);
  }
});

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  openPopup(editProfileModal);
});

// profileEditSaveButton.addEventListener("click", () => {
//   closePopup(editProfileModal);
// });

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
