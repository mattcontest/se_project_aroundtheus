export default class UserInfo {
  constructor({ profileName, profileJob }) {
    this.name = document.querySelector(profileName);
    this.job = document.querySelector(profileJob);
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      description: this.job.textContent,
    };
  }

  setUserInfo({ profileNameData, profileJobData }) {
    this.name.textContent = profileNameData;
    this.job.textContent = profileJobData;
  }
}
