const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <button onclick="deleteTask(this)">🗑️</button>
  `;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  taskList.appendChild(li);
  taskInput.value = "";
  saveTasks();
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.text}</span>
      <button onclick="deleteTask(this)">🗑️</button>
    `;
    if (task.completed) li.classList.add("completed");
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });
    taskList.appendChild(li);
  });
}
