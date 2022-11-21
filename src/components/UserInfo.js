export default class UserInfo {
  constructor(name, about, image) {
    this._name = name;
    this._about = about
    this._image = image;
  }

  getUserInfo() {
    const object = {
      name: this._name.textContent,
      about: this._about.textContent
    }
    return object
  }

  setUserInfo(data) {
    this._name.textContent = data.name
    this._about.textContent = data.about
  }

  setUserAvatar(image) {
    this._image.src = image;
  }
}
