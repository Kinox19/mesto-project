export const cardsGrid = document.querySelector('.cards-grid');
export const cardTemplate = document.querySelector('#card').content;

export const closePopUpButtons = document.querySelectorAll('.button_type_close');
export const userProfileEdit = document.querySelector('.button_type_edit');
export const addCardButton = document.querySelector('.button_type_add');
export const userAvatarEdit = document.querySelector('.button_type_edit-avatar')

export const allPopUps = document.querySelectorAll('.popup')
export const userProfilePopUp = document.querySelector('#popup-user');
export const userProfileForm = document.querySelector('#user');
export const newPlaceForm = document.querySelector('#newPlace')
export const addCardPopUp = document.querySelector('#popup-place');
export const imagePopUp = document.querySelector('#popup-image');
export const avatarPopUp = document.querySelector('#popup-avatar');
export const avatarForm = document.querySelector('#newAvatar');

export const nameInput = document.querySelector('#user-name');
export const userTitle = document.querySelector('.profile__title')
export const descriptionInput = document.querySelector('#user-description');
export const userDescription = document.querySelector('.profile__description');
export const userAvatar = document.querySelector('.profile__avatar');

export const placeNameInput = document.querySelector('#place-name');
export const placeLinkInput = document.querySelector('#place-link');
export const avatarLinkInput = document.querySelector('#avatar-link')

export const imagePopUpCaption = document.querySelector('.popup__caption');
export const imageInPopUp = document.querySelector('.popup__image');

export const cardLikesCounter = document.querySelector('.card__like-counter')

export const validationSettings = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
}