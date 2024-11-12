export default class FormValidator {
  constructor(
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    },
    formElement
  ) {
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._form = formElement;
  }

  _showInputError(inputEl) {
    const errorMessage = this._form.querySelector(`#${inputEl.id}-error`);
    console.log("I'm adding", this._inputErrorClass);
    inputEl.classList.add(this._inputErrorClass);
    errorMessage.textContent = inputEl.validationMessage + "Coming from here!!";
    errorMessage.classList.add(this._errorMessage);
  }

  _hideInputError(inputEl) {
    const errorMessage = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessage.textContent = "";
    errorMessage.classList.remove(this._errorClass);
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonState() {
    //Continue from here
    let flag = this._hasInvalidInput(this._inputElements);

    if (flag) {
      this.disableSubmitButton();
    } else {
      this.enableButton();
    }
  }

  _setEventListeners() {
    this._inputElements = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputElements.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputEl) {
    console.log("It loggs till _checkInputValidity");
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  enableValidation() {
    this._setEventListeners();
  }
}
