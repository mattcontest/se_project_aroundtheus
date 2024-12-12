export default class UserInfo {
  constructor({ profileName, profileJob, profilePicture }) {
    this.name = document.querySelector(profileName);
    this.job = document.querySelector(profileJob);
    this.avatar = document.querySelector(profilePicture);
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      description: this.job.textContent,
      avatar: this.avatar.src,
    };
  }

  //In case change later the avatar assignment
  //Given we are on the setter this might cause a problem in case no avatar data
  //is readily available to get assigned
  setUserInfo({ profileNameData, profileJobData, profileAvatar }) {
    this.name.textContent = profileNameData;
    this.job.textContent = profileJobData;
    if (profileAvatar) {
      this.avatar.src = profileAvatar;
    }
  }
}
