// API calls for user operations
const userModel = {
  async signup(username, password) {
    const res = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error("Signup failed");
    }
  },

  async login(username, password) {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error("Login failed");
    }
  }
};
