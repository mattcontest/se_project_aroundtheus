export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status} here`);
      }
    });
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
