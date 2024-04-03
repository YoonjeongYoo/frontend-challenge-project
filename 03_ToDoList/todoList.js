let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  const prioritySelect = document.getElementById("prioritySelect");
  const priorityValue = prioritySelect.value;

  if (taskText !== "") {
    const task = {
      text: taskText,
      priority: priorityValue,
      completed: false,
      date: new Date()
    };
    tasks.push(task);
    renderTasks();
    taskInput.value = "";
  }
}

function filterTasks(filter) {
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return task.completed;
    } else if (filter === "uncompleted") {
      return !task.completed;
    }
  });
  renderFilteredTasks(filteredTasks);
}

function sortTasks(sortType) {
  switch (sortType) {
    case "desc": // 우선순위가 높은 순
      tasks.sort((a, b) => {
        return a.priority.localeCompare(b.priority);
      });
      break;
    case "asc": // 우선순위가 낮은 순
      tasks.sort((a, b) => {
        return b.priority.localeCompare(a.priority);
      });
      break;
    default:
      break;
  }
  renderTasks();
}

function renderFilteredTasks(filteredTasks) {
  const tasksContainer = document.getElementById("tasksContainer");
  tasksContainer.innerHTML = "";
  filteredTasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    });

    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;

    const prioritySpan = document.createElement("span");
    prioritySpan.textContent = `[${task.priority}]`;
    // 우선 순위에 따라 다른 색상 적용
    switch (task.priority) {
      case "낮음":
        prioritySpan.style.color = "green";
        break;
      case "보통":
        prioritySpan.style.color = "blue";
        break;
      case "높음":
        prioritySpan.style.color = "orange";
        break;
      case "아주 높음":
        prioritySpan.style.color = "red";
        break;
      default:
        break;
    }

    const editButton = document.createElement("button");
    editButton.textContent = "수정";
    editButton.addEventListener("click", () => {
      const textInput = document.createElement("input");
      textInput.type = "text";
      textInput.value = task.text;

      const prioritySelect = document.createElement("select");
      const options = ["낮음", "보통", "높음", "아주 높음"];
      options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        prioritySelect.appendChild(optionElement);
      });
      prioritySelect.value = task.priority;

      const saveButton = document.createElement("button");
      saveButton.textContent = "저장";
      saveButton.addEventListener("click", () => {
        tasks[index].text = textInput.value;
        tasks[index].priority = prioritySelect.value;
        renderTasks();
      });

      taskElement.innerHTML = ""; // Clear previous content
      taskElement.appendChild(checkbox);
      taskElement.appendChild(textInput);
      taskElement.appendChild(prioritySelect);
      taskElement.appendChild(saveButton);
      taskElement.appendChild(deleteButton);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    taskElement.appendChild(checkbox);
    taskElement.appendChild(textSpan);
    taskElement.appendChild(prioritySpan);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);
    tasksContainer.appendChild(taskElement);
  });
}

function renderTasks() {
  filterTasks("all");
}

renderTasks();
