import { checkResponse } from "./utils";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25',
  headers: {
    authorization: '09a759f4-5d35-4881-946d-43e4e52334b1',
    'Content-Type': 'application/json'
  }
}

export function fetchInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers
    })
    .then(checkResponse)
  }

export function fetchInitialProfile() {
    return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
})
    .then(checkResponse)
}

export function editProfile(newName, newDescr) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
          body: JSON.stringify({
            name: newName,
            about: newDescr
          })
    })
    .then(checkResponse)
}

export function editAvatar(newUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newUrl
    })
  })
  .then(checkResponse)
}

export function pushNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(checkResponse)
}

export function deleteCard(cardId){
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      cardId: cardId
    })
  })
  .then(checkResponse)
}

export function putLike(cardId){
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      cardId: cardId
    })
  })
  .then(checkResponse)
}

export function removeLike(cardId){
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({
      cardId: cardId
    })
  })
  .then(checkResponse)
}