import {
    cardTemplate,
    imageInPopUp,
    imagePopUpCaption,
    imagePopUp,
    cardsGrid,
    placeNameInput,
    placeLinkInput,
    userAvatar,
    confirmationDelete
  } from "./common";

import { userId } from "./index";
import {fetchInitialCards, pushNewCard} from './api'
import { openPopUp } from "./modal";

export function createCard(cardData) {
    const { name, link, likes} = cardData;
    const ownerId = cardData.owner._id;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikesCounter = cardElement.querySelector('.card__like-counter')
    const deleteButton = cardElement.querySelector('.button_type_delete');
    cardElement.querySelector('.card__title').textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    cardLikesCounter.textContent = likes.length

    //попап картинка
    cardImage.addEventListener('click', () => {
      imageInPopUp.src = link;
      imageInPopUp.alt = name;
      imagePopUpCaption.textContent = name;
      openPopUp(imagePopUp);
    });

    // лайкаем карточку
    cardElement.querySelector('.button_type_like').addEventListener('click', function (e) {
      e.target.classList.toggle('button_type_like_active');
    });

    // удаляем карточку
    if(ownerId === userId){
      deleteButton.style.display = 'block'
    }

    deleteButton.addEventListener('click', function (e) {
      openPopUp(confirmationDelete)
      // e.target.closest('.card').remove();
    });
    return cardElement;
};

export function addNewCard() {
  const name = placeNameInput.value;
  const link = placeLinkInput.value;
  pushNewCard(name, link)
  .then((res) => {
    createCard(res)
  })
  .catch(error => {
    console.log(error)
  })
}

  fetchInitialCards()
  .then((res) => {
    res.forEach((cardData) => {
      const cardElement = createCard(cardData);
      cardsGrid.append(cardElement);
    });
  });
