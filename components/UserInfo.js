export default class UserInfo {
  constructor({ profileNameSelector, profileJobSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
  }

  //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      profileName: this._profileName.textContent,
      profileJob: this._profileJob.textContent,
    };
  }

  //принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(profileName, profileJob) {
    this._profileName.textContent = profileName;
    this._profileJob.textContent = profileJob;
  }
}
