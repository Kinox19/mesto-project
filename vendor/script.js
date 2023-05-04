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
const userProfilePopUp = document.querySelector('.popup');

function showInitialCards(titleText, imageLink){
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = titleText;
    cardElement.querySelector('.card__image').src = imageLink;

    cardElement.querySelector('.button_type_like').addEventListener('click', function (e) {
        e.target.classList.toggle('button_type_like_active');
      });

    cardsGrid.append(cardElement);
}

function renderCards(card) {
    const cardTitle = card.name;
    const cardImage = card.link;
    showInitialCards(cardTitle, cardImage);
  }

initialCards.map(renderCards);



