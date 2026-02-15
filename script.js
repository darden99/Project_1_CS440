let currentUser = null;
let tasks = [];

// tasks

async function fetchTasks() 
{
  const res = await fetch("/tasks");
  tasks = await res.json();
  displayTasks();
}

function displayTasks(filteredTasks) 
{
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  const toDisplay = filteredTasks || tasks;

  toDisplay.forEach(task => {
    list.innerHTML += `
      <div class="task">
        <div class="task-info">
          <strong class="title">${task.title}</strong> by ${task.username || "Unknown"}<br>
          <span class="description">${task.description}</span>
        </div>
        <div>
          ${
            currentUser && task.username === currentUser
              ? `<button onclick="editTask(${task.id})">Edit</button>
                 <button onclick="deleteTask(${task.id})">Delete</button>`
              : ""
          }
        </div>
      </div>
    `;
  });
}


async function addTask() 
{
  if (!currentUser) return alert("Please login to add tasks");
  const title = document.getElementById("taskTitle").value;
  const desc = document.getElementById("taskDesc").value;

  if (!title.trim()) return alert("Task title required!");

  const res = await fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description: desc, user_id: currentUserId })
  });

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDesc").value = "";
  fetchTasks();
}

async function deleteTask(id) 
{
  const res = await fetch(`/tasks/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: currentUserId })
  });
  fetchTasks();
}

document.getElementById("filterInput").addEventListener("input", applyFilterAndSort);

function applyFilterAndSort() 
{
  const filter = document.getElementById("filterInput").value.toLowerCase();

  // Filter tasks by title, description, or username
  let filteredTasks = tasks.filter(task =>
    (task.title || "").toLowerCase().includes(filter) ||
    (task.description || "").toLowerCase().includes(filter) ||
    (task.username || "").toLowerCase().includes(filter)
  );

  // Sort tasks
  const sortValue = document.getElementById("sortSelect").value;
  switch(sortValue) {
    case "title-asc": filteredTasks.sort((a,b) => a.title.localeCompare(b.title)); break;
    case "title-desc": filteredTasks.sort((a,b) => b.title.localeCompare(a.title)); break;
    case "user-asc": filteredTasks.sort((a,b) => (a.username||"").localeCompare(b.username||"")); break;
    case "user-desc": filteredTasks.sort((a,b) => (b.username||"").localeCompare(a.username||"")); break;
  }

  displayTasks(filteredTasks);
}





// users

let currentUserId = null;

async function signupUser() 
{
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;

  const res = await fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    const data = await res.json();

    // Clear input fields
    document.getElementById("signupUsername").value = "";
    document.getElementById("signupPassword").value = "";

    currentUser = data.username;
    currentUserId = data.id;
    document.getElementById("currentUser").innerText = `Logged in as: ${currentUser}`;

    // Close modal
    closeModal('signupModal');

    alert("Signup successful!");
    fetchTasks();
  } 
  else 
  {
    alert("Signup failed");
  }
}


async function loginUser() 
{
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) 
    {
    const data = await res.json();

    // Clear input fields
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";

    currentUser = data.username;
    currentUserId = data.id;
    document.getElementById("currentUser").innerText = `Logged in as: ${currentUser}`;

    // Close modal
    closeModal('loginModal');

    alert(`Welcome, ${currentUser}!`);
    fetchTasks();
    } 
    else 
      {
    alert("Login failed");
    }
}


function logoutUser() 
{
  currentUser = null;
  currentUserId = null;
  document.getElementById("currentUser").innerText = "Not logged in";

  alert("Logged out");
  fetchTasks();
}


function openModal(id) 
{
  document.getElementById(id).style.display = "flex";
}

function closeModal(id) 
{
  document.getElementById(id).style.display = "none";
}

fetchTasks();
