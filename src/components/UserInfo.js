export default class UserInfo {
  constructor({selectorUserName, selectorUserStatus}) {
    this._userName = document.querySelector(selectorUserName);
    this._userStatus = document.querySelector(selectorUserStatus);
  }

  //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo() {
    return {name: this._userName.textContent, status: this._userStatus.textContent};
  }

  //метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userStatus.textContent = data.status;
  }
}