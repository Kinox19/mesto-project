const cardsGrid = document.querySelector('.cards-grid');
const cardTemplate = document.querySelector('#card').content;

const closePopUpButtons = document.querySelectorAll('.button_type_close');
const userProfileEdit = document.querySelector('.button_type_edit');
const addCardButton = document.querySelector('.button_type_add');

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
}

function closePopUp(closestPopUp){
    closestPopUp.classList.remove('popup_opened');
}

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




