function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessage = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessage.textContent = inputEl.validationMessage;
  errorMessage.classList.add(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
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
  if (hasInvalidInput(inputElements)) {
    return disableButton(submitButton, { inactiveButtonClass });
  }

  return enableButton(submitButton, { inactiveButtonClass });
}

function setEventListeners(formElement, options) {
  //Syntatic Sugar
  const { inputSelector, submitButtonSelector } = options;
  //Equivalent just for reference
  // const inputSelector = options.inputSelector;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];

  const submitButton = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputElements, submitButton, options);

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
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__btn",
  inactiveButtonClass: "modal__btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
