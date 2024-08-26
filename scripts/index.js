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
const profileEditButton = document.querySelector("#profile--edit-button");
const modalSelect = document.querySelector("#profile-edit-modal");
const modalCloseButton = document.querySelector(".modal_close");
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileNameInput = document.querySelector("#title__form");
const profileSubtitleInput = document.querySelector("#description__form");
// const modalSaveButton = document.querySelector(".modal_btn");
const profileEditForm = document.forms["profile-form"];
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

const cardList = document.querySelector(".cards__list");

/* ------------------------------------------------------------------------------------------- */
/*                                   Default Values                                            */
/* ------------------------------------------------------------------------------------------- */

// modalSelect.classList.add("modal__close");
profileNameInput.value = profileName.textContent;
profileSubtitleInput.value = profileSubtitle.textContent;

/* ------------------------------------------------------------------------------------------- */
/*                                   Functions                                                 */
/* ------------------------------------------------------------------------------------------- */

function closePopup() {
  modalSelect.classList.remove("modal__open");
  modalCloseButton.classList.remove("modal__open");
}

function openPopup() {
  modalSelect.classList.add("modal__open");
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

function editSubtmitHandler(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closePopup();
  console.log("Fire in the hall!");
}

/* ------------------------------------------------------------------------------------------- */
/*                                   Event Listeners                                           */
/* ------------------------------------------------------------------------------------------- */

modalCloseButton.addEventListener("click", closePopup);

profileEditButton.addEventListener("click", (e) => {
  modalSelect.classList.add("modal__open");
  modalCloseButton.classList.add("modal__open");
});

profileName.addEventListener("click", () => {
  console.log(profileName.textContent);
});

profileEditForm.addEventListener("submit", editSubtmitHandler);

// Initializing all cards through getCardElement
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
});
