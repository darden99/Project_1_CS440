const taskModel = {
  async getAllTasks() {
    const res = await fetch("/tasks");
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error("Failed to fetch tasks");
    }
  },

  async createTask(title, description, user_id) {
    const res = await fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, user_id })
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error("Failed to add task");
    }
  },

  async deleteTask(id, user_id) {
    const res = await fetch(`/tasks/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id })
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error("Failed to delete task");
    }
  },

  async updateTask(id, title, description, user_id) {
    const res = await fetch(`/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, user_id })
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error("Failed to update task");
    }
  }
};
