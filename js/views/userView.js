const userView = {
  updateCurrentUserDisplay(username) {
    document.getElementById("currentUser").innerText = username
      ? `Logged in as: ${username}`
      : "Not logged in";
  },

  showLoginForm() {
    document.getElementById("loginBtn").style.display = "block";
    document.getElementById("signupBtn").style.display = "block";
    document.getElementById("logoutBtn").style.display = "none";
  },

  showLogoutButton() {
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("signupBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "block";
  },

  clearSignupForm() {
    document.getElementById("signupUsername").value = "";
    document.getElementById("signupPassword").value = "";
  },

  clearLoginForm() {
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
  },

  getSignupData() {
    return {
      username: document.getElementById("signupUsername").value,
      password: document.getElementById("signupPassword").value
    };
  },

  getLoginData() {
    return {
      username: document.getElementById("loginUsername").value,
      password: document.getElementById("loginPassword").value
    };
  }
};
