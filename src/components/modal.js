import { closePopUpButtons, allPopUps } from "./common";



closePopUpButtons.forEach(button => {
    const closestPopUp = button.closest('.popup');
    button.addEventListener('click', () => {
        closePopUp(closestPopUp);
    });
});

allPopUps.forEach((popUp) => {
  popUp.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')){
      closePopUp(popUp)
    }
  })
})

export function openPopUp(popUp){
  popUp.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeClose);
}

export function closePopUp(popUp){
  popUp.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeClose);
}

const handleEscapeClose = (e) => {
  if (e.key === 'Escape') {
      const openedPopUp = document.querySelector('.popup_opened')
      closePopUp(openedPopUp)
  }
}