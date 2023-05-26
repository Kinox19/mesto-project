const cardsGrid = document.querySelector('.cards-grid');
const cardTemplate = document.querySelector('#card').content;

const closePopUpButtons = document.querySelectorAll('.button_type_close');
const userProfileEdit = document.querySelector('.button_type_edit');
const addCardButton = document.querySelector('.button_type_add');

const allPopUps = document.querySelectorAll('.popup')
const userProfilePopUp = document.querySelector('#popup-user');
const userProfileForm = document.querySelector('#user');
const newPlaceForm = document.querySelector('#newPlace')
const addCardPopUp = document.querySelector('#popup-place');
const imagePopUp = document.querySelector('#popup-image');

const nameInput = document.querySelector('#user-name');
const userTitle = document.querySelector('.profile__title')
const descriptionInput = document.querySelector('#user-description');
const userDescription = document.querySelector('.profile__description');

const placeNameInput = document.querySelector('#place-name');
const placeLinkInput = document.querySelector('#place-link');

const imagePopUpCaption = document.querySelector('.popup__caption');
const imageInPopUp = document.querySelector('.popup__image');



function openPopUp(popUp){
    popUp.classList.add('popup_opened');
    popUp.addEventListener('click', (e) => {
      if(e.target.classList.contains('popup')){
        closePopUp(popUp);
      }
    });
    popUp.addEventListener('keydown', (e) => {
      if(e.key === 'Escape'){
        closePopUp(popUp);
      }
    });
}

function closePopUp(closestPopUp){
    closestPopUp.classList.remove('popup_opened');
    closestPopUp.removeEventListener('click', (e) => {
      if(e.target.classList.contains('popup')){
        closePopUp(popUp);
      }
    });
    closestPopUp.removeEventListener('keydown', (e) => {
      if(e.key === 'Escape'){
        closePopUp(popUp);
      }
    });
}

//сейчас без табиндекса не закрывается попап по Esc
allPopUps.forEach(popUp => {
  popUp.setAttribute('tabindex', '0');
})

closePopUpButtons.forEach(button => {
    const closestPopUp = button.closest('.popup');
    button.addEventListener('click', () => {
        closePopUp(closestPopUp);
    });
});

function createCard(cardData) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    //попап картинка
    cardImage.addEventListener('click', () => {
      imageInPopUp.src = cardData.link;
      imageInPopUp.alt = cardData.name;
      imagePopUpCaption.textContent = cardData.name;
      openPopUp(imagePopUp);
    });

    // лайкаем карточку
    cardElement.querySelector('.button_type_like').addEventListener('click', function (e) {
      e.target.classList.toggle('button_type_like_active');
    });

    // удаляем карточку
    cardElement.querySelector('.button_type_delete').addEventListener('click', function (e) {
      e.target.closest('.card').remove();
    });

    return cardElement;
};

  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    cardsGrid.append(cardElement);
  });

  function addNewCard() {
    const cardObj = {name: placeNameInput.value, link:placeLinkInput.value};
    const card = createCard(cardObj);
    return card;
};

newPlaceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const card = addNewCard();
    cardsGrid.prepend(card);
    closePopUp(addCardPopUp);

    placeNameInput.value = '';
    placeLinkInput.value = '';
  });

userProfileEdit.addEventListener('click', () =>{
    openPopUp(userProfilePopUp);
    nameInput.value = userTitle.textContent;
    descriptionInput.value = userDescription.textContent;
})

userProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userTitle.textContent =  nameInput.value;
    userDescription.textContent = descriptionInput.value;
    closePopUp(userProfilePopUp);
});

addCardButton.addEventListener('click', () =>{
    openPopUp(addCardPopUp);
});

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};


const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button')
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, inputElement);
    });
  });
};


function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState(inputList, buttonElement){
  if( hasInvalidInput(inputList) ){
    buttonElement.classList.add('popup__button_inactive');
    buttonElement.setAttribute('disabled', '')
  } else {
    buttonElement.classList.remove('popup__button_inactive');
    buttonElement.removeAttribute('disabled')
  }
}

enableValidation();

