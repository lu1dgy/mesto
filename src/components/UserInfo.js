export default class UserInfo {
  constructor(name, role) {
    this._name = name;
    this._role = role
  }

  getUserInfo() {
    const object = {
      name: this._name.textContent,
      role: this._role.textContent
    }
    return object
  }

  setUserInfo(data) {
    this._name.textContent = data.name
    this._role.textContent = data.role
  }
}
