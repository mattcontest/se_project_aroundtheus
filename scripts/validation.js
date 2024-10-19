function setEventListeners() {}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formEl) => {
    console.log(formEl);
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formElements, options);

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

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
