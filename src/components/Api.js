export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers
  }

  _error(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject('error')
    }
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, { headers: this._headers }).then(this._error)
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, { headers: this._headers }).then(this._error)
  }

  getData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  getUserAvatar(avatar) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })

    })
      .then(this._error)
  }

  setUserInfo(name, about) {
    return fetch(
      `${this._url}users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name,
          about
        })
      })
      .then(this._error)
  }

  postUserCard(post) {
    return fetch(`${this._url}cards`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          link: post.link,
          name: post.name
        })
      })
      .then(this._error)
  }

  addLike(likeId) {
    return fetch(`${this._url}cards/${likeId}/likes`,
      {
        method: 'PUT',
        headers: this._headers
      })
      .then(this._error)
  }

  removeLike(likeId) {
    return fetch(`${this._url}cards/${likeId}/likes`,
      {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._error)
  }

  removeCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`,
      {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._error)
  }




}
