const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25',
  headers: {
    authorization: '09a759f4-5d35-4881-946d-43e4e52334b1',
    'Content-Type': 'application/json'
  }
}

//переименовать
export function fetchInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: '09a759f4-5d35-4881-946d-43e4e52334b1'
      }
    })
    .then(res => res.json())
    .then((res) => {
      return res;
    })
    .catch(error => {
      console.log(error);
    });
  }

//переименовать
export function fetchInitialProfile() {
    return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
  headers: {
    authorization: '09a759f4-5d35-4881-946d-43e4e52334b1'
  }
})
  .then(res => res.json())
  .then((res) => {
    return res;
  })
  .catch(error => {
    console.log(error)
  });
}

export function editProfile(newName, newDescr) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: '09a759f4-5d35-4881-946d-43e4e52334b1',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newName,
            about: newDescr
          })
    })
    .then(res => res.json())
    .catch((error) => {
      console.log(error)
    })
}

export function editAvatar(newUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: '09a759f4-5d35-4881-946d-43e4e52334b1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: newUrl
    })
  })
  .then((res) => res.json())
  .catch((error) => {
    console.log(error)
  })
}

export function pushNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: '09a759f4-5d35-4881-946d-43e4e52334b1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then((res) => res.json())
  .catch((error) => {
    console.log(error)
    throw error;
  })
}

export function deleteCard(cardId){
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '09a759f4-5d35-4881-946d-43e4e52334b1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cardId: cardId
    })
  })
  .then((res) => res.json())
  .catch((error) => {
    console.log(error)
  })
}

export function putLike(cardId){
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '09a759f4-5d35-4881-946d-43e4e52334b1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cardId: cardId
    })
  })
  .then((res) => res.json())
  .catch((error) => {
    console.log(error)
  })
}

export function removeLike(cardId){
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '09a759f4-5d35-4881-946d-43e4e52334b1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cardId: cardId
    })
  })
  .then((res) => res.json())
  .catch((error) => {
    console.log(error)
  })
}