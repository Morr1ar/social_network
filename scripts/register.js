import { enableValidation, clearValidation, disableSubmitButton, showInputError, hideInputError } from "./components/validation.js";
import {
    checkUsername
} from './api.js';



// DOM узлы
const authForm = document.querySelector(".auth-form");
const registerForm = authForm.querySelector('.popup__form');
const registerNameInput = registerForm.querySelector(".popup__input_type_name");
const registerUserNameInput = registerForm.querySelector(".popup__input_type_userName");
const registerPasswordInput = registerForm.querySelector(".popup__input_type_password");













// EventListeners
//registerForm.addEventListener("submit", handleRegisterFormSubmit);






// Создание объекта с настройками валидации
const validationSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button_submit",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationSettings);
clearValidation(registerForm, validationSettings);


registerUserNameInput.addEventListener('blur', async function () {
    try {
        const users = await checkUsername(registerUserNameInput.value);
        if (users) {
            showInputError(registerUserNameInput, 'Этот никнэйм уже занят', validationSettings);
            disableSubmitButton(registerForm.querySelector(validationSettings.submitButtonSelector), validationSettings);
        } else {
            hideInputError(registerUserNameInput, validationSettings);
        }
    } catch {
        showInputError(registerUserNameInput, 'Ошибка проверки username', validationSettings); // возможно лучше в alert
    }
});