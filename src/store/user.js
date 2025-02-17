// src/store/user.js
import { reactive } from "vue";

export const userState = reactive({
  loggedInUser: null,
  setUser(user) {
    this.loggedInUser = user;
    localStorage.setItem("user", JSON.stringify(user));
  },
  clearUser() {
    this.loggedInUser = null;
    localStorage.removeItem("user");
  },
  checkUser() {
    const user = localStorage.getItem("user");
    if (user) {
      //this.loggedInUser = user;
      this.loggedInUser = JSON.parse(user);
      console.log("User loaded from localStorage:", this.loggedInUser);
    }
  }
});

