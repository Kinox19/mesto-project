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
import {pushNewCard, putLike, removeLike} from './api'
import { openPopUp, closePopUp } from "./modal";
import { deletingHandler } from "./index";
import { loadingButton } from "./utils";
import { toggleButtonState } from "./validate";
import { addCardPopUp, newPlaceForm } from "./common";



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
        .catch((error) => {
          console.log(error)
        })
      } else {
        putLike(_id)
        .then((res) => {
          e.target.classList.add('button_type_like_active');
          cardLikesCounter.textContent = res.likes.length;
        })
        .catch((error) => {
          console.log(error)
        })
      }
    });

    // удаляем карточку
    if(ownerId === userId){
      deleteButton.style.display = 'block'
    }

    deleteButton.addEventListener('click', function () {
      deletingHandler(_id, cardElement);
    });

    return cardElement;
};

export function addNewCard() {
  loadingButton(popupPlaceButton, true);
  const name = placeNameInput.value;
  const link = placeLinkInput.value;
  pushNewCard(name, link)
    .then((res) => {
      const cardElement = createCard(res);
      cardsGrid.prepend(cardElement);
      closePopUp(addCardPopUp);
      newPlaceForm.reset();
      const inputList = Array.from(newPlaceForm.querySelectorAll('.popup__input'));
      const buttonElement = newPlaceForm.querySelector('.popup__button');
      toggleButtonState(inputList, buttonElement, { inactiveButtonClass: 'popup__button_inactive' });
    })
    .catch(error => {
      console.log(`Карточку создать не вышло: ${error}`);
    })
    .finally(() => loadingButton(popupPlaceButton, false));
}