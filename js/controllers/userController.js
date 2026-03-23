const userController = {
  async signup() {
    const { username, password } = userView.getSignupData();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const user = await userModel.signup(username, password);
      app.state.currentUser = user.username;
      app.state.currentUserId = user.id;

      userView.clearSignupForm();
      userView.updateCurrentUserDisplay(app.state.currentUser);
      userView.showLogoutButton();
      closeModal('signupModal');

      alert("Signup successful!");
      taskController.fetchTasks();
    } catch (err) {
      alert(err.message || "Signup failed");
    }
  },

  async login() {
    const { username, password } = userView.getLoginData();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const user = await userModel.login(username, password);
      app.state.currentUser = user.username;
      app.state.currentUserId = user.id;

      userView.clearLoginForm();
      userView.updateCurrentUserDisplay(app.state.currentUser);
      userView.showLogoutButton();
      closeModal('loginModal');

      alert(`Welcome, ${app.state.currentUser}!`);
      taskController.fetchTasks();
    } catch (err) {
      alert(err.message || "Login failed");
    }
  },

  logout() {
    app.state.currentUser = null;
    app.state.currentUserId = null;
    userView.updateCurrentUserDisplay(null);
    userView.showLoginForm();
    alert("Logged out");
    taskController.fetchTasks();
  }
};
