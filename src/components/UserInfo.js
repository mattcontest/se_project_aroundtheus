export default class UserInfo {
  constructor({ profileName, profileJob }) {
    this.name = document.querySelector(profileName);
    this.job = document.querySelector(profileJob);
  }

  getUserInfo() {
    // console.log("This,name", this.name);
    // console.log("This,job", this.job);
    return {
      name: this.name.textContent,
      description: this.job.textContent,
    };
  }

  setUserInfo(userInfo) {
    // console.log("This name", profileNameData);
    // console.log("This job", profileJobData);
    // this.name.textContent = profileNameData;
    // this.job.textContent = profileJobData;
    this.name.textContent = userInfo.title;
    this.job.textContent = userInfo.description;
    console.log("Updated name", this.name.textContent);
    console.log("Updated job", this.job.textContent);
  }
}
