let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    const prioritySelect = document.getElementById("prioritySelect");
    const priority = prioritySelect.value;
    if (taskText !== "") {
        const task = {
            text: taskText,
            priority: priority,
            completed: false
        };
        tasks.push(task);
        renderTasks();
        taskInput.value = "";
    }
}

function renderTasks() {
    const tasksContainer = document.getElementById("tasksContainer");
    tasksContainer.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        });
        const prioritySpan = document.createElement("span");
        prioritySpan.textContent = `우선순위: ${task.priority}`;
        const textSpan = document.createElement("span");
        textSpan.textContent = task.text;
        taskElement.appendChild(checkbox);
        taskElement.appendChild(textSpan);
        taskElement.appendChild(prioritySpan);
        tasksContainer.appendChild(taskElement);
    });
}
