export default class Api {
constructor({url, headers}) {
  this._url = url;
  this._headers = headers
}

_error(res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject('erorr')
  }
}

getUserInfo() {
  return fetch(`${this._url}users/me`, {headers: this._headers}).then(this._error)
}

getInitialCard() {
  return fetch(`${this._url}cards`,{headers: this._headers}).then(this._error)
}

getData() {
  return Promise.all([this.getUserInfo(), this.getInitialCard()])
}

getUserAvatar(image) {
return fetch(`${this._url}users/me/avatar`,{
  method: 'PATCH',
  headers: this._headers,
  body: JSON.stringify({image})

})
  .then(this._error)
}
}
