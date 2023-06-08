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
  validationSettings,
  avatarForm,
  avatarLinkInput,
  confirmationDelete
} from './common'
import  {enableValidation}  from "./validate";
import { addNewCard, createCard } from './card';
import { openPopUp, closePopUp } from './modal';
import { loadingButton } from './utils';
import {fetchInitialProfile, editProfile, editAvatar, deleteCard, fetchInitialCards} from './api'

export let userId;
let deleteCardId;
let deleteCardElement;


newPlaceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addNewCard();
  });


  userProfileEdit.addEventListener('click', () =>{
    openPopUp(userProfilePopUp);
    nameInput.value = userTitle.textContent;
    descriptionInput.value = userDescription.textContent;
  });

  userProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loadingButton(e.submitter, true)
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
      })
      .finally(() => loadingButton(e.submitter, false))
  });

avatarForm.addEventListener('submit', (e) => {
  e.preventDefault();
  loadingButton(e.submitter, true)
  const newUrl = avatarLinkInput.value;
  editAvatar(newUrl)
  .then(() => {
    userAvatar.src = newUrl;
    closePopUp(avatarPopUp);
  })
  .catch(error => {
    console.log(error)
  })
  .finally(() => loadingButton(e.submitter, false))
});

addCardButton.addEventListener('click', () =>{
    openPopUp(addCardPopUp);
});

userAvatarEdit.addEventListener('click', () => {
  openPopUp(avatarPopUp);
  avatarLinkInput.value = userAvatar.src;
})

enableValidation(validationSettings);

export function deletingHandler(cardId, cardElement) {
  openPopUp(confirmationDelete);
  deleteCardId = cardId;
  deleteCardElement = cardElement;
  confirmationDelete.addEventListener('submit', handleDeleteSubmit);
}

function handleDeleteSubmit(e) {
  e.preventDefault();
  deletitingCard(deleteCardId, deleteCardElement);
  confirmationDelete.removeEventListener('submit', handleDeleteSubmit);
}

function deletitingCard(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      closePopUp(confirmationDelete);
    })
    .catch((err) => {
      console.log(err);
    });
}

Promise.all([fetchInitialProfile(), fetchInitialCards()])
.then(([user, initialCards]) => {
  userTitle.textContent = user.name;
  userDescription.textContent = user.about;
  userAvatar.src = user.avatar;
  userId = user._id

  initialCards.forEach(card => {
    const cardElement = createCard(card);
    cardsGrid.append(cardElement);
  })
})
.catch((error) => {
  console.log(error)
})