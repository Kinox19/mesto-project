export function loadingButton(button, isLoading){
    if (isLoading){
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = 'Сохранить'
    }
}


export function checkResponse(res) {
    if(!res.ok){
        return Promise.reject(`Случилась ошибка: ${res.status}`);
    } else {
        return res.json();
    }
}