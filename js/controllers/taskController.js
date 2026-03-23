const taskController = {
  async fetchTasks() {
    try {
      const tasks = await taskModel.getAllTasks();
      taskView.setTasks(tasks);
      taskView.displayTasks();
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  },

  async addTask() {
    if (!app.state.currentUser) {
      alert("Please login to add tasks");
      return;
    }

    const { title, description } = taskView.getTaskInputData();

    if (!title.trim()) {
      alert("Task title required!");
      return;
    }

    try {
      await taskModel.createTask(title, description, app.state.currentUserId);
      taskView.clearTaskForm();
      this.fetchTasks();
    } catch (err) {
      alert(err.message || "Failed to add task");
    }
  },

  async deleteTask(id) {
    if (!app.state.currentUser) {
      alert("Please login to delete tasks");
      return;
    }

    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await taskModel.deleteTask(id, app.state.currentUserId);
      this.fetchTasks();
    } catch (err) {
      alert(err.message || "Failed to delete task");
    }
  },

  async editTask(id) {
    alert("Edit functionality coming soon");
    // TODO: Implement edit modal
  }
};
