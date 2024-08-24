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

const profileEditButton = document.querySelector("#profile--edit-button");
const modalSelect = document.querySelector("#profile-edit-modal");
const modalCloseButton = document.querySelector(".modal_close");
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileNameInput = document.querySelector("#title__form");
const profileSubtitleInput = document.querySelector("#description__form");
const modalSaveButton = document.querySelector(".modal_btn");
const profileEditForm = modalSelect.querySelector(".modal__form");
// Default values
modalSelect.classList.add("modal__close");
profileNameInput.value = profileName.textContent;
profileSubtitleInput.value = profileSubtitle.textContent;

modalCloseButton.addEventListener("click", (e) => {
  profileNameInput.value = profileName.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  modalSelect.classList.add("modal__close");
});

profileEditButton.addEventListener("click", (e) => {
  modalSelect.classList.remove("modal__close");
});

profileName.addEventListener("click", () => {
  console.log(profileName.textContent);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Fire in the hall!");
});
