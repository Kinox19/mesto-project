import '../pages/styles.css';
import {
  cardsGrid,
  userProfileEdit,
  addCardButton,
  userAvatarEdit,
  userProfilePopUp,
  avatarPopUp,
  userProfileForm,
  newPlaceForm,
  addCardPopUp,
  nameInput,
  userTitle,
  descriptionInput,
  userDescription,
  userAvatar,
  placeNameInput,
  placeLinkInput,
  validationSettings,
  avatarForm,
  avatarLinkInput,

} from './common'
import  {enableValidation, toggleButtonState}  from "./validate";
import { addNewCard } from './card';
import { openPopUp, closePopUp } from './modal';

import {fetchInitialProfile, editProfile, editAvatar} from './api'

export let userId;


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
    const newName = nameInput.value;
    const newDescr = descriptionInput.value;
    editProfile(newName, newDescr)
      .then(() => {
        userTitle.textContent = newName;
        userDescription.textContent = newDescr;
        closePopUp(userProfilePopUp);
      })
      .catch(error => {
        console.error(error);
      });
  });



avatarForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newUrl = avatarLinkInput.value;
  editAvatar(newUrl)
  .then(() => {
    userAvatar.src = newUrl;
    closePopUp(avatarPopUp);
  })
  .catch(error => {
    console.log(error)
  })
})

addCardButton.addEventListener('click', () =>{
    openPopUp(addCardPopUp);
});

userAvatarEdit.addEventListener('click', () => {
  openPopUp(avatarPopUp);
  avatarLinkInput.value = userAvatar.src;
})

enableValidation(validationSettings);


fetchInitialProfile()
.then((res) => {
  userTitle.textContent = res.name;
  userDescription.textContent = res.about;
  userAvatar.src = res.avatar;
  userId = res._id
})

