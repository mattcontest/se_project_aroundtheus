import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
// import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import { initialCards } from "../utils/constants.js";
import { config } from "../utils/constants.js";

/* ------------------------------------------------------------------------------------------- */
/*                                   Elements                                                  */
/* ------------------------------------------------------------------------------------------- */

import {
  profileName,
  profileEditButton,
  profileSubtitle,
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
  profileEditForm,
  cardTemplate,
  cardList,
} from "../utils/constants.js";

/* ------------------------------------------------------------------------------------------- */
/*                                   Instantiating Classes                                            */
/* ------------------------------------------------------------------------------------------- */

const profileEditModal = new PopupWithForm(
  "#edit-modal",
  handleProfileFormSubmit
);
profileEditModal.setEventListeners();

// const addCardModal = new PopupWithForm("#add-modal", handleAddCardFormSubmit);
const addCardModal = new PopupWithForm("#add-modal", handleAddCardFormSubmit);
addCardModal.setEventListeners();

const previewCardModal = new PopupWithImage("#picture-modal");
previewCardModal.setEventListeners();

const userInfo = new UserInfo({
  profileName: ".profile__name",
  profileJob: ".profile__subtitle",
});

const cardSection = new Section(
  {
    initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems(initialCards);

/* ------------------------------------------------------------------------------------------- */
/*                                   Functions                                                 */
/* ------------------------------------------------------------------------------------------- */

function createCard(data) {
  const card = new Card(data, "#card__template", handleImageClick);
  return card.getView();
}

// function renderCard(cardData) {
//   // const cardElement = getCardElement(cardData);
//   // const card = new Card(cardData, "#card__template");
//   const cardElement = createCard(cardData);
//   // const cardElement = card.getView();
//   cardList.prepend(cardElement);
// }

// function closePopup(modal) {
//   modal.classList.remove("modal_open");
//   document.removeEventListener("keydown", handleEscapeKey);
// }

// function openPopup(modal) {
//   modal.classList.add("modal_open");
//   document.addEventListener("keydown", handleEscapeKey);
// }

// function handleEscapeKey(evt) {
//   if (evt.key === "Escape") {
//     const openModal = document.querySelector(".modal_open");
//     closePopup(openModal);
//   }
// }

function handleImageClick(data) {
  // previewCardImage.src = data.link;
  // previewCardImage.alt = data.name;
  // previewCardTitle.textContent = data.name;
  // openPopup(picturePreviewModal);
  previewCardModal.open(data);
}

/* ------------------------------------------------------------------------------------------- */
/*                                  Event Handlers                                             */
/* ------------------------------------------------------------------------------------------- */

function handleProfileFormSubmit(inputData) {
  // e.preventDefault();
  // profileName.textContent = profileNameInput.value;
  // profileSubtitle.textContent = profileSubtitleInput.value;
  // console.log("Check this payload", inputData.title);
  // console.log("Check this payload", inputData.description);
  userInfo.setUserInfo({
    profileNameData: inputData.title,
    profileJobData: inputData.description,
  });
  //Substituted closePopup with the instantiation of PopupWithForm
  editModalForm.reset();
  editCardFormValidator.disableSubmitButton();
  profileEditModal.close();
}

function handleAddCardFormSubmit(inputValues) {
  // console.log(inputValues.title, "<- Check here");
  // console.log(inputValues.description, "<- Check here");
  // e.preventDefault();
  // const titleCard = cardTitleForm.value;
  // const linkCard = cardImageForm.value;
  const cardElement = createCard({
    name: inputValues.title,
    link: inputValues.description,
  });
  addCardForm.reset();
  cardSection.addItem(cardElement);
  //Added addCardFormValidator.disableSubmitButton(); here before opening the modal
  addCardFormValidator.disableSubmitButton();
  addCardModal.close();
}

/* ------------------------------------------------------------------------------------------- */
/*                                   Event Listeners                                           */
/* ------------------------------------------------------------------------------------------- */

profileModalCloseButton.addEventListener("click", () =>
  //Substituted closePopup with the instantiation of PopupWithForm
  profileEditModal.close()
);

//Implemented logic to close modal when clicking otuside of the Modal Container with its attributes
editModal.addEventListener("click", (event) => {
  if (!editModalContainer.contains(event.target)) {
    //Substituted closePopup with the instantiation of PopupWithForm
    // closePopup(editProfileModal);
    profileEditModal.close();
  }
});

//Implemented logic to close modal when clicking otuside of the Modal Container with its attributes

addModal.addEventListener("click", (event) => {
  if (!addModalContainer.contains(event.target)) {
    addCardModal.close();
  }
});

//Implemented logic to close modal when clicking otuside of the Modal Container with its attributes
// picturePreviewModal.addEventListener("click", (event) => {
//   if (!modalPictureContainer.contains(event.target)) {
//     closePopup(picturePreviewModal);
//   }
// });

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  editCardFormValidator.resetValidation();
  editCardFormValidator.disableSubmitButton();
  profileEditModal.open();
  //Substituted openPopup with the instantiation of PopupWithForm
});

// profileEditForm.addEventListener("submit", handleProfileFormSubmit);

// Initializing all cards through getCardElement
// initialCards.forEach((cardData) => {
//   //Working on implementing Card Section here
//   renderCard(cardData);
//   cardSection.renderItems(ca);
// });

addButton.addEventListener("click", () => {
  // openPopup(addModal);
  addCardModal.open();
});

addCloseButton.addEventListener("click", () =>
  // closePopup(addModal)
  addCardModal.close()
);

// addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// previewCloseButton.addEventListener("click", () =>
//   closePopup(picturePreviewModal)
// );

const addCardFormValidator = new FormValidator(config, addCardForm);
const editCardFormValidator = new FormValidator(config, editModalForm);

addCardFormValidator.enableValidation();
editCardFormValidator.enableValidation();
