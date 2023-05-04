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

const closePopUpButton = document.querySelector('.button_type_close');
const userProfileEdit = document.querySelector('.button_type_edit');
const userProfilePopUp = document.querySelector('#popup-user');
const nameInput = document.querySelector('#user-name');
const userTitle = document.querySelector('.profile__title')
const descriptionInput = document.querySelector('#user-description');
const userDescription = document.querySelector('.profile__description')


function showInitialCards(titleText, imageLink){
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = titleText;
    cardElement.querySelector('.card__image').src = imageLink;

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


function closePopUp(popUp){
    popUp.classList.remove('popup_opened');
}

function openPopUp(popUp){
    popUp.classList.add('popup_opened');
}

userProfileEdit.addEventListener('click', () =>{
    openPopUp(userProfilePopUp);
    nameInput.value = userTitle.textContent;
    descriptionInput = userDescription.textContent;
})

closePopUpButton.addEventListener('click', () =>{
    closePopUp(userProfilePopUp);
})

userProfilePopUp.addEventListener('submit', (e) => {
    e.preventDefault();
    userTitle.innerHTML =  nameInput.value;
    userDescription.innerHTML = descriptionInput.value;
    closePopUp(userProfilePopUp);
});