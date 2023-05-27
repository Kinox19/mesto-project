import '../pages/styles.css';
import {
  cardsGrid,
  userProfileEdit,
  addCardButton,
  userProfilePopUp,
  userProfileForm,
  newPlaceForm,
  addCardPopUp,
  nameInput,
  userTitle,
  descriptionInput,
  userDescription,
  placeNameInput,
  placeLinkInput,
  validationSettings
} from './common'
import  {enableValidation, toggleButtonState}  from "./validate";
import { addNewCard } from './card';
import { openPopUp, closePopUp } from './modal';


newPlaceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const card = addNewCard();
    cardsGrid.prepend(card);
    closePopUp(addCardPopUp);
    placeNameInput.value = '';
    placeLinkInput.value = '';
    const inputList = Array.from(newPlaceForm.querySelectorAll('.popup__input'));
    const buttonElement = newPlaceForm.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement, { inactiveButtonClass: 'popup__button_inactive' });
  });

userProfileEdit.addEventListener('click', () =>{
    openPopUp(userProfilePopUp);
    nameInput.value = userTitle.textContent;
    descriptionInput.value = userDescription.textContent;
});

userProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userTitle.textContent =  nameInput.value;
    userDescription.textContent = descriptionInput.value;
    closePopUp(userProfilePopUp);
});

addCardButton.addEventListener('click', () =>{
    openPopUp(addCardPopUp);
});

enableValidation(validationSettings);
