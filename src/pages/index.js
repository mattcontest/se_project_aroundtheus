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
  profileEditAvatar,
  editAvatarForm,
} from "../utils/constants.js";
import PopupDelete from "../components/PopupDelete.js";

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

//Instantiation of PopupDelete for deleting Card
const popupConfirmDelete = new PopupDelete("#delete-modal");
popupConfirmDelete.setEventListeners();

const popupEditAvatar = new PopupWithForm("#avatar-edit", handleAvatarSubmit);
popupEditAvatar.setEventListeners();

// cardSection.renderItems(initialCards);

/* ------------------------------------------------------------------------------------------- */
/*                                   Functions                                                 */
/* ------------------------------------------------------------------------------------------- */

function createCard(data) {
  const card = new Card(
    data,
    "#card__template",
    handleImageClick,
    handleDeleteCard,
    handleLikeCard,
    handleRemoveLikeCard
  );
  console.log("Check owner of card just created", card.owner);
  // console.log("Check created cardId", data._id);
  return card.getView();
}

function handleImageClick(data) {
  previewCardModal.open(data);
  // console.log("Check here for id", data.id);
}

function handleRemoveLikeCard(card) {
  api
    .removeLikeCard(card.getId())
    .then((response) => {
      console.log("Api response", response);
      card.likeStatus = response.isLiked;
      card.setLikeState();
      // card._handleLikeIcon();
      // card.removeLikeCard();
      console.log("Removed Like", card.getId());
    })
    .catch((err) => console.log("Error in removing a Like", err));
}

function handleLikeCard(card) {
  api
    .likeCard(card.getId())
    .then((response) => {
      console.log("Api resposnse", response);
      card.likeStatus = response.isLiked;
      // card._handleLikeIcon();
      // card.likeCard();
      card.setLikeState();
      console.log("Liked", card.getId());
    })
    .catch((err) => console.log("Error in Liking a card", err));
}

function handleDeleteCard(card) {
  popupConfirmDelete.open();
  popupConfirmDelete.setSubmitCallback(() => {
    api
      .deleteCard(card.getId())
      .then(() => {
        card.handlerDeleteCard();
        console.log("Deleted", card.getId());
        popupConfirmDelete.close();
      })
      .catch((err) => console.error("Error in deleting card", err));
  });
}

// function handleLikeCard(card){
//   api.likeCard(card.getId())
// }

/* ------------------------------------------------------------------------------------------- */
/*                                  Event Handlers                                             */
/* ------------------------------------------------------------------------------------------- */

function handleProfileFormSubmit(inputData) {
  profileEditModal.renderLoading(true);
  api
    .updateUserInfo({
      name: inputData.title,
      about: inputData.description,
    })
    .then((res) => {
      console.log("Visalize res", res);
      // console.log("Visualize res.title", res._id);
      // console.log("Visualize res", res._id);
      userInfo.setUserInfo({
        // profileNameData: inputData.title,
        profileNameData: res.name,
        // profileJobData: inputData.description,
        profileJobData: res.about,
      });
      editModalForm.reset();
      profileEditModal.close();
    })
    .catch((err) => {
      console.error("Error in submitting Profile form", err);
    })
    .finally(() => profileEditModal.renderLoading(false));

  //Substituted closePopup with the instantiation of PopupWithForm
}

function handleAddCardFormSubmit(inputValues) {
  addCardModal.renderLoading(true);
  api
    .addCard({
      name: inputValues.title,
      link: inputValues.description,
    })
    .then((cardData) => {
      console.log("Check the cargo", cardData);
      const cardElement = createCard({
        name: cardData.name,
        link: cardData.link,
        _id: cardData._id,
      });
      addCardForm.reset();
      cardSection.addItem(cardElement);
      addCardFormValidator.disableSubmitButton();
      addCardModal.close();
    })
    .catch((err) => {
      console.error("Error in adding a card:", err);
    })
    .finally(() => addCardModal.renderLoading(false));
}

//Handle Avatar Submit Work in progress
function handleAvatarSubmit(data) {
  // const avatar = data.link;
  popupEditAvatar.renderLoading(true);

  api
    .updateProfilePicture({
      avatar: data.avatar_link,
    })
    .then((data) => {
      //In case of it not working check in UserInfo
      // userInfo.profilePicture = data;
      console.log("That's the data from the server", data);
      console.log("Just checking", data.avatar);
      userInfo.setAvatar(data.avatar);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.error("Error in updating the profile picture", err);
    })
    .finally(() => popupEditAvatar.renderLoading(false));
}

/* ------------------------------------------------------------------------------------------- */
/*                                   Event Listeners                                           */
/* ------------------------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  // profileNameInput.value = name;
  // profileSubtitleInput.value = description;
  profileEditModal.setInputs({
    title: name,
    description: description,
  });
  editCardFormValidator.resetValidation();
  editCardFormValidator.disableSubmitButton();
  profileEditModal.open();
});

addButton.addEventListener("click", () => {
  addCardModal.open();
});

const addCardFormValidator = new FormValidator(config, addCardForm);
const editCardFormValidator = new FormValidator(config, editModalForm);
const editAvatarFormValidator = new FormValidator(config, editAvatarForm);

//Enabling Form Validators

addCardFormValidator.enableValidation();
editCardFormValidator.enableValidation();

editAvatarFormValidator.enableValidation();

profileEditAvatar.addEventListener("click", () => {
  popupEditAvatar.open();
});

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

api
  .getData()
  .then(({ userData, cards }) => {
    console.log("Check here", userData);
    // console.log("User avatar", userData.avatar);
    // console.log("User Id", userData._id);
    // console.log("Check here", cards);

    userInfo.setUserInfo({
      profileNameData: userData.name,
      profileJobData: userData.about,
      profileAvatar: userData.avatar,
    });
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error("Error in retrieving Data", err);
  });
