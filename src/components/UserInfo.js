export default class UserInfo {
  constructor({selectorUserName, selectorUserStatus, selectorUserAvatar}) {
    this._userName = document.querySelector(selectorUserName);
    this._userStatus = document.querySelector(selectorUserStatus);
    this._userAvatar = document.querySelector(selectorUserAvatar);
  }

  //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo() {
    return {name: this._userName.textContent, about: this._userStatus.textContent, avatar: this._userAvatar};
  }

  //метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userStatus.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}