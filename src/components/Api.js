class Api {
  constructor(options) {}

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "524600c8-c5da-4bc8-a443-7b5815826c0b",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
}
