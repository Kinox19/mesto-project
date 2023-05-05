const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


const cardsGrid = document.querySelector('.cards-grid');
const cardTemplate = document.querySelector('#card').content;

const closePopUpButtons = document.querySelectorAll('.button_type_close');
const userProfileEdit = document.querySelector('.button_type_edit');
const addCardButton = document.querySelector('.button_type_add');

const userProfilePopUp = document.querySelector('#popup-user');
const userProfileForm = document.querySelector('#user');
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

function showInitialCards(titleText, imageLink){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = titleText;
    cardElement.querySelector('.card__image').src = imageLink;
    cardElement.querySelector('.card__image').alt = titleText;



    cardElement.querySelector('.card__image').addEventListener('click', openImageAsPopUp);
    // лайкаем карточку
    cardElement.querySelector('.button_type_like').addEventListener('click', function (e) {
        e.target.classList.toggle('button_type_like_active');
      });

    // удаляем карточку
    cardElement.querySelector('.button_type_delete').addEventListener('click', function (e) {
        e.target.closest('.card').remove();
    });



    cardsGrid.append(cardElement);
}

function renderCards(card) {
    const cardTitle = card.name;
    const cardImage = card.link;
    showInitialCards(cardTitle, cardImage);
  }

initialCards.map(renderCards);

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
})

addCardPopUp.addEventListener('submit', (e) =>{
    e.preventDefault();
    cardsGrid.prepend(addNewCard());
    closePopUp(addCardPopUp);

    placeNameInput.value = '';
    placeLinkInput.value = '';
})

function addNewCard () {
    const newCardTemplate = document.querySelector('#card').content;
    const newCard = newCardTemplate.querySelector('.card').cloneNode(true);
    // лайкаем карточку
    newCard.querySelector('.button_type_like').addEventListener('click', function (e) {
        e.target.classList.toggle('button_type_like_active');
      });

    // удаляем карточку
    newCard.querySelector('.button_type_delete').addEventListener('click', function (e) {
        e.target.closest('.card').remove();
    });
    newCard.querySelector('.card__image').addEventListener('click', openImageAsPopUp);
    newCard.querySelector('.card__image').src = placeLinkInput.value;
    newCard.querySelector('.card__image').alt = placeNameInput.value;
    newCard.querySelector('.card__title').textContent = placeNameInput.value;

    return newCard
}

function openImageAsPopUp(e){
    const imageCaption = e.target.closest('.card').querySelector('.card__title');
    imagePopUpCaption.textContent = imageCaption.textContent;
    imageInPopUp.src = e.target.closest('.card').querySelector('.card__image').src;
    imageInPopUp.alt = imagePopUpCaption.textContent;
    openPopUp(imagePopUp);
}
