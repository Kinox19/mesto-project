import { closePopUpButtons } from "./common";
import { closePopUp } from "./modal";

export const handleEscapeClose = (e) => {
    if (e.key === 'Escape') {
        const openedPopUp = document.querySelector('.popup_opened')
        closePopUp(openedPopUp)
    }
  }

  closePopUpButtons.forEach(button => {
    const closestPopUp = button.closest('.popup');
    button.addEventListener('click', () => {
        closePopUp(closestPopUp);
    });
});