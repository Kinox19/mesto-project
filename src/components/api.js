//переименовать
export function fetchInitialCards() {
    return fetch('https://nomoreparties.co/v1/plus-cohort-25/cards', {
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
    return fetch('https://nomoreparties.co/v1/plus-cohort-25/users/me', {
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
    return fetch('https://nomoreparties.co/v1/plus-cohort-25/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '09a759f4-5d35-4881-946d-43e4e52334b1',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newName,
            about: newDescr
          })
    });
}

export function editAvatar(newUrl) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-25/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '09a759f4-5d35-4881-946d-43e4e52334b1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: newUrl
    })
  });
}

