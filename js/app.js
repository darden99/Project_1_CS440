const app = {
  state: {
    currentUser: null,
    currentUserId: null
  },

  init() {
    console.log("Task Manager App initialized");
    this.setupEventListeners();
    taskController.fetchTasks();
  },

  setupEventListeners() {
    const filterInput = document.getElementById("filterInput");
    const sortSelect = document.getElementById("sortSelect");

    if (filterInput) {
      filterInput.addEventListener("input", () => taskView.applyFilterAndSort());
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", () => taskView.applyFilterAndSort());
    }
  }
};

function openModal(id) {
  document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
