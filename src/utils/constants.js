export const initialCards = [
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

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__btn",
  inactiveButtonClass: "modal__btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

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

const profileEditAvatar = document.querySelector(".profile__picture_edit-icon");

export {
  profileName,
  profileEditButton,
  profileSubtitle,
  profileEditForm,
  editModal,
  editModalContainer,
  editProfileModal,
  profileEditSaveButton,
  profileModalCloseButton,
  profileNameInput,
  profileSubtitleInput,
  picturePreviewModal,
  modalPictureContainer,
  previewCardImage,
  previewCardTitle,
  previewCloseButton,
  addModal,
  addModalContainer,
  addButton,
  addCloseButton,
  editModalForm,
  addCardButton,
  addCardForm,
  cardTitleForm,
  cardImageForm,
  cardTemplate,
  cardList,
  profileEditAvatar,
};
