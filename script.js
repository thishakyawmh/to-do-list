import { parseTasks, serializeTasks } from "./task-utils.js";

const inputBox = document.getElementById("input-box");
const taskForm = document.getElementById("task-form");
const listContainer = document.getElementById("list-container");
const statusMessage = document.getElementById("task-status");
const STORAGE_KEY = "sparexpress-todo-tasks";

function loadTasks() {
  try {
    return parseTasks(localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

let tasks = loadTasks();

function announce(message) {
  if (statusMessage) statusMessage.textContent = message;
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, serializeTasks(tasks));
    announce("Tasks saved on this device.");
  } catch {
    announce("Unable to save tasks in this browser.");
  }
}

function renderTasks() {
  if (!listContainer) return;

  listContainer.replaceChildren();

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.classList.toggle("checked", task.completed);
    item.dataset.taskId = task.id;
    item.tabIndex = 0;
    item.setAttribute("role", "checkbox");
    item.setAttribute("aria-checked", String(task.completed));

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-task";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", `Delete task: ${task.text}`);

    item.append(taskText, deleteButton);
    listContainer.appendChild(item);
  });
}

function addTask(event) {
  event?.preventDefault();

  const text = inputBox?.value.trim() || "";
  if (!text) {
    announce("Enter a task before adding it.");
    inputBox?.focus();
    return;
  }

  tasks.push({
    id: globalThis.crypto?.randomUUID?.() || String(Date.now()),
    text,
    completed: false,
  });

  if (inputBox) inputBox.value = "";
  saveTasks();
  renderTasks();
  inputBox?.focus();
}

function toggleTask(taskId) {
  tasks = tasks.map((task) => (
    task.id === taskId ? { ...task, completed: !task.completed } : task
  ));
  saveTasks();
  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks();
  renderTasks();
}

taskForm?.addEventListener("submit", addTask);

listContainer?.addEventListener("click", (event) => {
  const item = event.target.closest("li[data-task-id]");
  if (!item) return;

  if (event.target.closest(".delete-task")) {
    deleteTask(item.dataset.taskId);
    return;
  }

  toggleTask(item.dataset.taskId);
});

listContainer?.addEventListener("keydown", (event) => {
  if (
    event.target.matches("li[data-task-id]") &&
    (event.key === "Enter" || event.key === " ")
  ) {
    event.preventDefault();
    toggleTask(event.target.dataset.taskId);
  }
});

renderTasks();
