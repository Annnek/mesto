export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl; //адрес сервера
    this._headers = config.headers; //заголовки запроса
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  createCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._handleResponse(res));
  }

  // deleteCard(cardId) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //     body: JSON.stringify(data),
  //   }).then((res) => this._handleResponse(res));
  // }
}
