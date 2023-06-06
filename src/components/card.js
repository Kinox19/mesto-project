import {
    cardTemplate,
    imageInPopUp,
    imagePopUpCaption,
    imagePopUp,
    cardsGrid,
    placeNameInput,
    placeLinkInput,
    popupPlaceButton
  } from "./common";

import { userId } from "./index";
import {fetchInitialCards, pushNewCard, putLike, removeLike} from './api'
import { openPopUp } from "./modal";
import { deletingHandler } from "./index";
import { loadingButton } from "./utils";

export function createCard(cardData) {
    const { name, link, likes, _id} = cardData;
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
    if(likes.some((like) => like._id === userId)){
      cardElement.querySelector('.button_type_like').classList.add('button_type_like_active')
    }

    cardElement.querySelector('.button_type_like').addEventListener('click', function (e) {
      const isLikeActive = e.target.classList.contains('button_type_like_active')
      if (isLikeActive){
        removeLike(_id)
        .then((res) => {
          e.target.classList.remove('button_type_like_active');
          cardLikesCounter.textContent = res.likes.length;
        })
      } else {
        putLike(_id)
        .then((res) => {
          e.target.classList.add('button_type_like_active');
          cardLikesCounter.textContent = res.likes.length;
        })
      }
    });

    // удаляем карточку
    if(ownerId === userId){
      deleteButton.style.display = 'block'
    }

    deleteButton.addEventListener('click', function () {
      deletingHandler(_id, cardElement)
    });
    return cardElement;
};

export function addNewCard() {
  loadingButton(popupPlaceButton, true)
  const name = placeNameInput.value;
  const link = placeLinkInput.value;
  pushNewCard(name, link)
  .then((res) => {
    createCard(res)
  })
  .catch(error => {
    console.log(error)
  })
  .finally(() => loadingButton(popupPlaceButton, false))
}

  fetchInitialCards()
  .then((res) => {
    res.forEach((cardData) => {
      const cardElement = createCard(cardData);
      cardsGrid.append(cardElement);
    })
  });
