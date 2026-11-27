
const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const taskCount = document.getElementById("task-count");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const clearCompleted = document.getElementById("clear-completed");

let tasks = JSON.parse(localStorage.getItem("taskflow-tasks")) || [];

// Display today's date
const today = new Date();

document.getElementById("today-date").textContent =
    today.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

// Save tasks in localStorage
function saveTasks() {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
}

// Display tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const taskName = document.createElement("span");
        taskName.className = "task-name";
        taskName.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            renderTasks();
        });

        taskItem.append(checkbox, taskName, deleteButton);
        taskList.appendChild(taskItem);
    });

    // Empty message
    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";

    // Task count
    const completedTasks = tasks.filter(task => task.completed).length;
    taskCount.textContent = `${tasks.length} tasks • ${completedTasks} completed`;

    // Progress percentage
    const percentage = tasks.length === 0
        ? 0
        : Math.round((completedTasks / tasks.length) * 100);

    progressText.textContent = `${percentage}% completed`;
    progressFill.style.width = `${percentage}%`;
}

// Add a new task
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: taskText,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
});

// Clear completed tasks
clearCompleted.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});

// Display saved tasks when page opens
renderTasks();
