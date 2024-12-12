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
import Api from "../components/Api.js";

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
  profilePicture: ".profile__picture",
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

// cardSection.renderItems(initialCards);

/* ------------------------------------------------------------------------------------------- */
/*                                   Functions                                                 */
/* ------------------------------------------------------------------------------------------- */

function createCard(data) {
  const card = new Card(data, "#card__template", handleImageClick);
  return card.getView();
}

function handleImageClick(data) {
  previewCardModal.open(data);
}

/* ------------------------------------------------------------------------------------------- */
/*                                  Event Handlers                                             */
/* ------------------------------------------------------------------------------------------- */

function handleProfileFormSubmit(inputData) {
  api
    .updateUserInfo({
      name: inputData.title,
      about: inputData.description,
    })
    .then((res) => {
      console.log("Visualize _id", res._id);
      userInfo.setUserInfo({
        profileNameData: inputData.title,
        profileJobData: inputData.description,
      });
      editModalForm.reset();
      profileEditModal.close();
    });

  //Substituted closePopup with the instantiation of PopupWithForm
}

function handleAddCardFormSubmit(inputValues) {
  api
    .addCard({
      name: inputValues.title,
      link: inputValues.description,
    })
    .then((cardData) => {
      const cardElement = createCard({
        name: cardData.name,
        link: cardData.link,
      });
      addCardForm.reset();
      cardSection.addItem(cardElement);
      addCardFormValidator.disableSubmitButton();
      addCardModal.close();
    })
    .catch((err) => {
      console.error("Error in adding a card:", err);
    });
}

/* ------------------------------------------------------------------------------------------- */
/*                                   Event Listeners                                           */
/* ------------------------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileSubtitleInput.value = description;
  editCardFormValidator.resetValidation();
  editCardFormValidator.disableSubmitButton();
  profileEditModal.open();
});

addButton.addEventListener("click", () => {
  addCardModal.open();
});

const addCardFormValidator = new FormValidator(config, addCardForm);
const editCardFormValidator = new FormValidator(config, editModalForm);

addCardFormValidator.enableValidation();
editCardFormValidator.enableValidation();

/* ------------------------------------------------------------------------------------------- */
/*                                   API Calls                                           */
/* ------------------------------------------------------------------------------------------- */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "524600c8-c5da-4bc8-a443-7b5815826c0b",
    "Content-Type": "application/json",
  },
});

api.getData().then(({ userData, cards }) => {
  console.log("Check here", userData);
  console.log("User avatar", userData.avatar);
  console.log("User Id", userData._id);
  console.log("Check here", cards);

  userInfo.setUserInfo({
    profileNameData: userData.name,
    profileJobData: userData.about,
    profileAvatar: userData.avatar,
  });
  cardSection.renderItems(cards);
});
