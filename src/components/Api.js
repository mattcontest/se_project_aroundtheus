export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "GET",
    });
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: this._headers,
      method: "GET",
    });
  }

  getData() {
    return Promise.all([this.getUserData(), this.getInitialCards()])
      .then(([userData, cards]) => {
        if (!userData.ok || !cards.ok) {
          return Promise.reject(
            `Error ${!userData.ok ? userData.status : cards.status} check`
          );
        } else {
          return Promise.all([userData.json(), cards.json()]);
        }
      })
      .then(([userData, cards]) => {
        return { userData, cards };
      })
      .catch((err) => Promise.reject(`Error finding data: ${err}`));
  }
}
