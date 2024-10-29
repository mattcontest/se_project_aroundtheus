function ShowInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessage = formEl.querySelector(`#${inputEl.id}-error`);
  console.log("Check the computer errorMessage", errorMessage);
  console.log("That's the id", inputEl.id);
  console.log(
    "Check if finds the right errorMessage for the link",
    errorMessage
  );
  // const {inputErrorClass} = options;
  inputEl.classList.add(inputErrorClass);
  // console.log(inputEl.id);
  errorMessage.textContent = inputEl.validationMessage;
  errorMessage.classList.add(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    ShowInputError(formEl, inputEl, options);
    console.log("And then do this!");
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessage = formEl.querySelector(`#${inputEl.id}-error`);
  console.log("Check the computer errorMessage", errorMessage);
  inputEl.classList.remove(inputErrorClass);
  errorMessage.textContent = "";
  errorMessage.classList.remove(errorClass);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function disableButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

function enableButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }
) {
  // let foundInvalid = false;
  // inputElements.forEach((input) => {
  //   if (!input.validity.valid) {
  //     foundInvalid = true;
  //   }
  // });
  // if (foundInvalid) {
  //   submitButton.classList.add(inactiveButtonClass);
  //   // submitButton.disabled = true;
  // } else {
  //   submitButton.classList.remove(inactiveButtonClass);
  //   // submitButton.disabled = false;
  // }
  if (hasInvalidInput(inputElements)) {
    // submitButton.classList.add(inactiveButtonClass);
    // return (submitButton.disabled = true);
    return disableButton(submitButton, { inactiveButtonClass });
  }

  // submitButton.classList.remove(inactiveButtonClass);
  // submitButton.disabled = false;
  return enableButton(submitButton, { inactiveButtonClass });
}

function setEventListeners(formElement, options) {
  //Syntatic Sugar
  const { inputSelector } = options;
  //Equivalent just for reference
  // const inputSelector = options.inputSelector;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  // console.log("hello", inputElements);
  const submitButton = formElement.querySelector(".modal__btn");
  // console.log("Checking the submitButton", submitButton);
  inputElements.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputEl, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formEl) => {
    // console.log(formEl);
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);

    // Look for all inputs inside of form
    // Loop through all the inputs to see if all are valid
    // if input is not valid we
    //grab the  validation message
    //add error class to input
    //display error message
    //disabled button
    //if all inputs are valid
    // enable button
    // reset error message
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input, .modal__form_card",
  submitButtonSelector: ".modal__btn",
  inactiveButtonClass: "modal__button_close",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
