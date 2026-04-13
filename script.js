const task = {
  title: "Submit internship assignment",
  description: "Build a todo card component with semantic HTML, CSS and vanilla JS before the deadline.",
  priority: "High",
  status: "inprogress",
  dueDate: "2026-04-16",
  tags: ["Design", "UX", "Frontend"],
};

const card = document.querySelector('[data-testid="test-todo-card"]');
const titleElement = document.querySelector('[data-testid="test-todo-title"]');
const descriptionElement = document.querySelector(
  '[data-testid="test-todo-description"]',
);
const priorityElement = document.querySelector(
  '[data-testid="test-todo-priority"]',
);
const statusElement = document.querySelector(
  '[data-testid="test-todo-status"]',
);
const dueDateElement = document.querySelector(
  '[data-testid="test-todo-due-date"]',
);
const timeLeftElement = document.querySelector(
  '[data-testid="test-todo-time-remaining"]',
);
const tagsElement = document.querySelector('[data-testid="test-todo-tags"]');
const checkbox = document.querySelector(
  '[data-testid="test-todo-complete-toggle"]',
);
const editButton = document.querySelector(
  '[data-testid="test-todo-edit-button"]',
);
const deleteButton = document.querySelector(
  '[data-testid="test-todo-delete-button"]',
);

const populateCard = () => {
  titleElement.textContent = task.title;
  descriptionElement.textContent = task.description;
//   priorityElement.textContent = capitalize(task.priority);
   priorityElement.textContent = task.priority;
  priorityElement.className = `priority-badge priority-${task.priority.toLowerCase()}`;
  statusElement.textContent =
    // task.status === "inprogress" ? "In Progress" : capitalize(task.status);
      task.status === "inprogress" ? "In Progress" : task.status;
  statusElement.className = `status-badge status-${task.status}`;
  tagsElement.innerHTML = "";

  task.tags.forEach((tag) => {
    const li = document.createElement("li");
    li.textContent = tag;
    li.className = "tag"
    li.setAttribute("data-testid", `test-todo-tag-${tag.toLowerCase()}`);
    tagsElement.appendChild(li);
  });
};

const updateTime = () => {
  const now = new Date();
  const dueDate = new Date(task.dueDate);
  dueDate.setHours(23, 59, 59, 999);
  const timeDiffInMs = dueDate - now;
  const timeDiffInDays = Math.ceil(timeDiffInMs / (1000 * 60 * 60 * 24));
  const formatedDate = dueDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  dueDateElement.textContent = `Due: ${formatedDate}`;
  dueDateElement.setAttribute("datetime", dueDate.toISOString());

  let timeText = "";
  let timeClass = "";
  const timeSuffix = timeDiffInDays === 1 ? "day" : "days";
  if (timeDiffInDays < 0) {
    timeText = `Overdue by ${Math.abs(timeDiffInDays)} ${timeSuffix}`;
    timeClass = "overdue";
  } else if (timeDiffInDays === 0) {
    timeText = "Due today";
    timeClass = "urgent";
  } else if (timeDiffInDays === 1) {
    timeText = "Due tomorrow";
    timeClass = "urgent";
  } else if (timeDiffInDays <= 7) {
    timeText = `Due in ${timeDiffInDays} ${timeSuffix}`;
    timeClass = "soon";
  } else {
    timeText = `Due in ${timeDiffInDays} ${timeSuffix}`;
    timeClass = "safe";
  }

  timeLeftElement.textContent = timeText;
  timeLeftElement.setAttribute("datetime", dueDate.toISOString());
  timeLeftElement.classList.remove("overdue", "urgent", "soon", "safe");
  timeLeftElement.classList.add(timeClass);
};



checkbox.addEventListener("change", () => {
if (checkbox.checked) {
     card.classList.add("completed");
    statusElement.textContent = "Done";
    statusElement.className   = "status-badge status-done";
}else{
    card.classList.remove("completed");
    statusElement.textContent = task.status === "inprogress" ? "In Progress" : task.status;
    statusElement.className = `status-badge status-${task.status}`;
}
});

editButton.addEventListener("click", () => {
alert(`Editing task: ${task.title}`);
});

deleteButton.addEventListener("click", () => {
    const confirmDelete = confirm(`Are you sure you want to delete the task: ${task.title}? This action cannot be undone.`);
    if(confirmDelete){
        card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        card.style.opacity = "0";
      setTimeout(() => card.remove(), 300);
    }
});

populateCard();
updateTime();

setInterval(() => updateTime(), 30000);