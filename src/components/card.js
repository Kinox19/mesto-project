import {
    cardTemplate,
    imageInPopUp,
    imagePopUpCaption,
    imagePopUp,
    cardsGrid,
    placeNameInput,
    placeLinkInput
  } from "./common";

import {fetchInitialCards} from './api'
import { openPopUp } from "./modal";

export function createCard(cardData) {
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

export function addNewCard() {
  const cardObj = {name: placeNameInput.value, link:placeLinkInput.value};
  const card = createCard(cardObj);
  return card;
};

  fetchInitialCards()
  .then((res) => {
    res.forEach((cardData) => {
      const cardElement = createCard(cardData);
      cardsGrid.append(cardElement);
    });
  });






















//старый код на случай проблем
// initialCards.forEach((cardData) => {
//   const cardElement = createCard(cardData);
//   cardsGrid.append(cardElement);
// });

// export async function fetchAndRenderCards() {
//   try {
//     const response = await fetch('https://nomoreparties.co/v1/plus-cohort-25/cards', {
//       method: 'GET',
//       headers: {
//         authorization: '09a759f4-5d35-4881-946d-43e4e52334b1'
//       }
//     });

//     if (response.ok) {
//       const cardData = await response.json();
//       cardData.forEach((card) => {
//         const cardElement = createCard(card);
//         cardsGrid.append(cardElement);
//       });
//     } else {
//       throw new Error('Failed to fetch cards');
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

