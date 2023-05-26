import { closePopUpButtons, allPopUps, imagePopUp, } from "./common";

export function openPopUp(popUp){
    popUp.classList.add('popup_opened');
    popUp.addEventListener('click', (e) => {
      if(e.target.classList.contains('popup')){
        closePopUp(popUp);
      }
    });
    popUp.addEventListener('keydown', (e) => {
      if(e.key === 'Escape'){
        closePopUp(popUp);
      }
    });
}
export function closePopUp(closestPopUp){
    closestPopUp.classList.remove('popup_opened');
    closestPopUp.removeEventListener('click', (e) => {
      if(e.target.classList.contains('popup')){
        closePopUp(popUp);
      }
    });
    closestPopUp.removeEventListener('keydown', (e) => {
      if(e.key === 'Escape'){
        closePopUp(popUp);
      }
    });
}
//сейчас без табиндекса не закрывается попап по Esc
allPopUps.forEach(popUp => {
  popUp.setAttribute('tabindex', '0');
})


closePopUpButtons.forEach(button => {
    const closestPopUp = button.closest('.popup');
    button.addEventListener('click', () => {
        closePopUp(closestPopUp);
    });
});