function setEventListeners(formElement, options) {
  //Syntatic Sugar
  const { inputSelector } = options;
  //Equivalent just for reference
  // const inputSelector = options.inputSelector;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  // console.log("hello", inputElements);
  inputElements.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      if (inputEl.value.length <= 2) {
        console.log(inputEl.validity.valid);
      }
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
  inactiveButtonClass: ".modal__button_close",
  inputErrorClass: ".modal__input_type_error",
  errorClass: ".modal__error_visible",
};

enableValidation(config);
