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
const profileSubtitleInput = document.querySelector("#description__form");
const profileEditSaveButton = editProfileModal.querySelector(".modal__btn");
// Add Modal Elements
const addModal = document.querySelector("#add-modal");
const addButton = document.querySelector(".profile__add-button");
const addCloseButton = addModal.querySelector(".modal__close");

const profileEditForm = document.forms["profile-form"];
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

const cardList = document.querySelector(".cards__list");

//Hearth Button Elements
// const likeButtons = document.querySelectorAll(".card__button");
// console.log(likeButtons);
//
/* ------------------------------------------------------------------------------------------- */
/*                                   Default Values                                            */
/* ------------------------------------------------------------------------------------------- */

// modalSelect.classList.add("modal__close");

/* ------------------------------------------------------------------------------------------- */
/*                                   Functions                                                 */
/* ------------------------------------------------------------------------------------------- */

function closePopup(modal) {
  modal.classList.remove("modal__open");
}

function openPopup(modal) {
  modal.classList.add("modal__open");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

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
  closePopup();
  console.log("Fire in the hall!");
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
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
});

addButton.addEventListener("click", () => openPopup(addModal));

addCloseButton.addEventListener("click", () => closePopup(addModal));

//Selecting all Like Buttons after they are prepended
const likeButtons = document.querySelectorAll(".card__button");

likeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("card__buton_active");
  });
});
