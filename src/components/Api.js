export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  updateProfilePicture({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  removeLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "GET",
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "GET",
    }).then(this._checkResponse);
  }

  getData() {
    // return Promise.all([this.getUserData(), this.getInitialCards()]).then(
    //   ([userData, cards]) => ({ userData, cards })
    // );
    return Promise.all([this.getUserData(), this.getInitialCards()])
      .then(([userData, cards]) => {
        return Promise.all([userData, cards]);
      })
      .then(([userData, cards]) => {
        return { userData, cards };
      });
  }

  _checkResponse(res) {
    console.log("Check the response", res);
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error ${res.status}`);
    }
  }
}

// Example of instanciation of Api

// const api = new Api({
//     baseUrl: "https://around-api.en.tripleten-services.com/v1",
//     headers: {
//       authorization: "524600c8-c5da-4bc8-a443-7b5815826c0b",
//       // "Content-Type": "application/json",
//     },
//   });

//   // api
//   //   .getUserData()
//   //   .then((data) => {
//   //     return data.json();
//   //   })
//   //   .then((data) => {
//   //     userInfo.setUserInfo({
//   //       profileNameData: data.name,
//   //       profileJobData: data.about,
//   //     });
//   //   })
//   //   .catch((err) => console.error(`Error fetching user data: ${err}`));

//   // api
//   //   .getInitialCards()
//   //   .then((res) => {
//   //     if (res.ok) {
//   //       return res.json();
//   //     } else {
//   //       return Promise.reject(`Error: ${res.status}`);
//   //     }
//   //   })
//   //   .then((data) => {
//   //     console.log(data);
//   //     cardSection.renderItems(data);
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //   });

// getData() {
//   // return Promise.all([this.getUserData(), this.getInitialCards()]).then(
//   //   ([userData, cards]) => ({ userData, cards })
//   // );
//   return Promise.all([this.getUserData(), this.getInitialCards()])
//     .then(([userData, cards]) => {
//       if (!userData.ok || !cards.ok) {
//         return Promise.reject(
//           `Error ${!userData.ok ? userData.status : cards.status} check`
//         );
//       } else {
//         return Promise.all([userData.json(), cards.json()]);
//       }
//     })
//     .then(([userData, cards]) => {
//       return { userData, cards };
//     });
// }
