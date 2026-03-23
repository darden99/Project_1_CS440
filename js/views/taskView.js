const taskView = {
  tasks: [],

  setTasks(tasks) {
    this.tasks = tasks;
  },

  getTasks() {
    return this.tasks;
  },

  displayTasks(filteredTasks) {
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    const toDisplay = filteredTasks || this.tasks;

    toDisplay.forEach(task => {
      const isOwner = app.state.currentUser && task.username === app.state.currentUser;
      list.innerHTML += `
        <div class="task">
          <div class="task-info">
            <strong class="title">${task.title}</strong> by ${task.username || "Unknown"}<br>
            <span class="description">${task.description}</span>
          </div>
          <div>
            ${
              isOwner
                ? `<button onclick="taskController.editTask(${task.id})">Edit</button>
                   <button onclick="taskController.deleteTask(${task.id})">Delete</button>`
                : ""
            }
          </div>
        </div>
      `;
    });
  },

  getTaskInputData() {
    return {
      title: document.getElementById("taskTitle").value,
      description: document.getElementById("taskDesc").value
    };
  },

  clearTaskForm() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDesc").value = "";
  },

  applyFilterAndSort() {
    const filter = document.getElementById("filterInput").value.toLowerCase();
    const sortValue = document.getElementById("sortSelect").value;

    let filteredTasks = this.tasks.filter(task =>
      (task.title || "").toLowerCase().includes(filter) ||
      (task.description || "").toLowerCase().includes(filter) ||
      (task.username || "").toLowerCase().includes(filter)
    );

    switch(sortValue) {
      case "title-asc":
        filteredTasks.sort((a,b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filteredTasks.sort((a,b) => b.title.localeCompare(a.title));
        break;
      case "user-asc":
        filteredTasks.sort((a,b) => (a.username||"").localeCompare(b.username||""));
        break;
      case "user-desc":
        filteredTasks.sort((a,b) => (b.username||"").localeCompare(a.username||""));
        break;
    }

    this.displayTasks(filteredTasks);
  }
};
