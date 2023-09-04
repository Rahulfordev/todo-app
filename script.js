// script.js
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskButton = document.getElementById("addTaskButton");

var updateIcon = '<i class="fa-regular fa-pen-to-square"></i>';
var saveIcon = '<i class="fa-regular fa-floppy-disk"></i>';

// Function to create a task element
function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.innerHTML = ` 
        <input type="text" value="${taskText}" disabled>
        <button class="update">${updateIcon}</button>
        <input type="checkbox" /> 
        <button class="delete">×</button>
    `;
  return li;
}

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const taskElement = createTaskElement(taskText);
    taskList.appendChild(taskElement);
    taskInput.value = "";
    addTaskEventListeners(taskElement);

    // Save the updated task list to local storage
    saveTaskListToLocalStorage();
  }
}

// Function to update a task
function updateTask(taskElement) {
  const inputField = taskElement.querySelector("input");
  const updateButton = taskElement.querySelector(".update");

  // If the input field is disabled, enable it for editing
  if (inputField.disabled) {
    inputField.disabled = false;
    inputField.focus();
    updateButton.innerHTML = `${saveIcon}`;
  } else {
    // If the input field is enabled, save the edited text and disable the field
    inputField.disabled = true;
    updateButton.innerHTML = `${updateIcon}`;

    // Save the updated task list to local storage
    saveTaskListToLocalStorage();
  }
}

// Function to delete a task
function deleteTask(taskElement) {
  taskElement.remove();

  // Save the updated task list to local storage
  saveTaskListToLocalStorage();
}

// Function to add event listeners to task elements
function addTaskEventListeners(taskElement) {
  const updateButton = taskElement.querySelector(".update");
  const deleteButton = taskElement.querySelector(".delete");

  updateButton.addEventListener("click", () => updateTask(taskElement));
  deleteButton.addEventListener("click", () => deleteTask(taskElement));
}

// Function to save the task list to local storage
function saveTaskListToLocalStorage() {
  const tasks = Array.from(
    document.querySelectorAll('#taskList li input[type="text"]')
  ).map((input) => input.value);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage when the page loads
function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((taskText) => {
    const taskElement = createTaskElement(taskText);
    taskList.appendChild(taskElement);
    addTaskEventListeners(taskElement);
  });
}

// Call the loadTasksFromLocalStorage function when the page loads
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

// Add a task when the "Add ToDo" button is clicked
addTaskButton.addEventListener("click", addTask);

// Add a task when Enter key is pressed in the input field
document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
