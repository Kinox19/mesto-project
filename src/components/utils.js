export function loadingButton(button, isLoading){
    if (isLoading){
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = 'Сохранить'
    }
}