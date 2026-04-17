const task = {
  title: "Submit internship assignment",
  description:
    "Build a todo card component with semantic HTML, CSS and vanilla JS before the deadline.",
  priority: "High",
  status: "inprogress",
  dueDate: "2026-04-17",
  tags: ["Design", "UX", "Frontend"],
};

// GRAB ALL ELEMENTS
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

const priorityIndicator = document.querySelector(
  '[data-testid="test-todo-priority-indicator"]',
);
const statusControl = document.querySelector(
  '[data-testid="test-todo-status-control"]',
);
const expandToggle = document.querySelector(
  '[data-testid="test-todo-expand-toggle"]',
);
const collapsibleSection = document.querySelector(
  '[data-testid="test-todo-collapsible-section"]',
);
const overdueIndicator = document.querySelector(
  '[data-testid="test-todo-overdue-indicator"]',
);
const editForm = document.querySelector('[data-testid="test-todo-edit-form"]');
const displayMode = document.querySelector(".display-mode");

// Edit form inputs
const editTitleInput = document.querySelector(
  '[data-testid="test-todo-edit-title-input"]',
);
const editDescInput = document.querySelector(
  '[data-testid="test-todo-edit-description-input"]',
);
const editPrioritySelect = document.querySelector(
  '[data-testid="test-todo-edit-priority-select"]',
);
const editDueDateInput = document.querySelector(
  '[data-testid="test-todo-edit-due-date-input"]',
);
const saveButton = document.querySelector(
  '[data-testid="test-todo-save-button"]',
);
const cancelButton = document.querySelector(
  '[data-testid="test-todo-cancel-button"]',
);

let isExpanded = false; // tracks expand/collapse state
let timerInterval = null; // holds our setInterval so we can stop it

const populateCard = () => {
  titleElement.textContent = task.title;
  descriptionElement.textContent = task.description;

  priorityElement.textContent = task.priority;
  priorityElement.className = `priority-badge priority-${task.priority.toLowerCase()}`;

  // Priority indicator dot + card border
  priorityIndicator.className = `priority-indicator priority-${task.priority}`;
  card.classList.remove("priority-high", "priority-medium", "priority-low");
  card.classList.add(`priority-${task.priority}`);

  // Status badge
  statusElement.textContent =
    task.status === "inprogress" ? "In Progress" : task.status;
  statusElement.className = `status-badge status-${task.status}`;

  // Status control dropdown — make sure selected option matches
  statusControl.value = task.status;


  // Tags
  tagsElement.innerHTML = "";
  task.tags.forEach((tag) => {
    const li = document.createElement("li");
    li.textContent = tag;
    li.className = "tag";
    li.setAttribute("data-testid", `test-todo-tag-${tag.toLowerCase()}`);
    tagsElement.appendChild(li);
  });

    // Expand/collapse — check if description is long
  checkExpandNeeded();
};

const checkExpandNeeded = () => {
  if (task.description.length > 100) {
    // Description is long — show the toggle button
    expandToggle.classList.remove("hidden");

    if (isExpanded) {
      collapsibleSection.classList.add("expanded");
      expandToggle.textContent = "Show less";
      expandToggle.setAttribute("aria-expanded", "true");
    } else {
      collapsibleSection.classList.remove("expanded");
      expandToggle.textContent = "Show more";
      expandToggle.setAttribute("aria-expanded", "false");
    }
  } else {
    // Description is short — hide the toggle, always show full text
    expandToggle.classList.add("hidden");
    collapsibleSection.classList.add("expanded");
  }
};

expandToggle.addEventListener("click", () => {
  isExpanded = !isExpanded; // flip between true and false
  checkExpandNeeded();
});


const updateTime = () => {
  // If task is done — stop timer and show "Completed"
  if (task.status === "done") {
    timeLeftElement.textContent = "Completed";
    timeLeftElement.classList.remove("overdue", "urgent", "soon", "safe");
    overdueIndicator.classList.add("hidden");
    card.classList.remove("is-overdue");
    return; // exit the function early — no need to calculate time
  }

  const now = new Date();
  const dueDate = new Date(task.dueDate);
  dueDate.setHours(23, 59, 59, 999);
  const timeDiffInMs = dueDate - now;
 const diffInMinutes = Math.floor(Math.abs(timeDiffInMs) / (1000 * 60));
  const diffInHours   = Math.floor(diffInMinutes / 60);
  const diffInDays    = Math.floor(diffInHours / 24);

   // Format due date nicely
  const formatedDate = dueDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  dueDateElement.textContent = `Due: ${formatedDate}`;
  dueDateElement.setAttribute("datetime", dueDate.toISOString());

  let timeText = "";
  let timeClass = "";

if (timeDiffInMs < 0) {
    // OVERDUE
    if (diffInDays > 0) {
      timeText = `Overdue by ${diffInDays} day${diffInDays > 1 ? "s" : ""}`;
    } else if (diffInHours > 0) {
      timeText = `Overdue by ${diffInHours} hour${diffInHours > 1 ? "s" : ""}`;
    } else {
      timeText = `Overdue by ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""}`;
    }
    timeClass = "overdue";

    // Show overdue indicator and red card tint
    overdueIndicator.classList.remove("hidden");
    card.classList.add("is-overdue");

  } else {
    // NOT YET OVERDUE
    if (diffInDays > 7) {
      timeText  = `Due in ${diffInDays} days`;
      timeClass = "safe";
    } else if (diffInDays >= 2) {
      timeText  = `Due in ${diffInDays} days`;
      timeClass = "soon";
    } else if (diffInDays === 1) {
      timeText  = "Due tomorrow";
      timeClass = "urgent";
    } else if (diffInHours > 0) {
      // Less than a day — show hours
      timeText  = `Due in ${diffInHours} hour${diffInHours > 1 ? "s" : ""}`;
      timeClass = "urgent";
    } else {
      // Less than an hour — show minutes
      timeText  = `Due in ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""}`;
      timeClass = "urgent";
    }

    // Hide overdue indicator
    overdueIndicator.classList.add("hidden");
    card.classList.remove("is-overdue");
  }


  timeLeftElement.textContent = timeText;
  timeLeftElement.setAttribute("datetime", dueDate.toISOString());
  timeLeftElement.classList.remove("overdue", "urgent", "soon", "safe");
  timeLeftElement.classList.add(timeClass);
};

// ================================
// SYNC STATUS
// One function that keeps checkbox,
// status badge and status control
// all in sync with each other.
// ================================
const syncStatus = (newStatus) => {
  task.status = newStatus;

  // Update status badge
  statusElement.textContent = formatStatus(newStatus);
  statusElement.className   = `status-badge status-${newStatus}`;

  // Update status control dropdown
  statusControl.value = newStatus;

  // Update checkbox
  checkbox.checked = newStatus === "done";

  // Update card completed style
  if (newStatus === "done") {
    card.classList.add("completed");
  } else {
    card.classList.remove("completed");
  }

  // Update time immediately after status change
  updateTime();
};

// ================================
// CHECKBOX LISTENER
// Toggling checkbox changes status.
// ================================
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    syncStatus("done");
  } else {
    syncStatus("pending");
  }
});

// ================================
// STATUS CONTROL LISTENER
// Changing dropdown syncs everything.
// ================================
statusControl.addEventListener("change", () => {
  syncStatus(statusControl.value);
});



// ================================
// EDIT MODE
// ================================
const openEditMode = () => {
  // Fill form inputs with current task values
  editTitleInput.value        = task.title;
  editDescInput.value         = task.description;
  editPrioritySelect.value    = task.priority;
  editDueDateInput.value      = task.dueDate; // already in YYYY-MM-DD format

  // Hide display mode, show edit form
  displayMode.classList.add("hidden");
  editForm.classList.remove("hidden");

  // Focus the title input for good UX
  editTitleInput.focus();
};

const closeEditMode = () => {
  // Hide edit form, show display mode
  editForm.classList.add("hidden");
  displayMode.classList.remove("hidden");

  // Return focus to Edit button — accessibility requirement
  editButton.focus();
};

editButton.addEventListener("click", openEditMode);

// SAVE — update task object then repopulate card
saveButton.addEventListener("click", () => {
  // Validate — don't save if title is empty
  if (editTitleInput.value.trim() === "") {
    editTitleInput.focus();
    editTitleInput.style.borderColor = "#e53e3e"; // red border to signal error
    return;
  }

  // Update task object with new values
  task.title       = editTitleInput.value.trim();
  task.description = editDescInput.value.trim();
  task.priority    = editPrioritySelect.value;
  task.dueDate     = editDueDateInput.value;

  // Repopulate the card with updated values
  populateCard();
  updateTime();
  closeEditMode();
});

// CANCEL — just close without saving
cancelButton.addEventListener("click", closeEditMode);


// ================================
// DELETE BUTTON
// Same as Stage 0
// ================================
deleteButton.addEventListener("click", () => {
  const confirmDelete = confirm(`Are you sure you want to delete: "${task.title}"?`);
  if (confirmDelete) {
    card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    card.style.opacity    = "0";
    setTimeout(() => card.remove(), 300);
  }
});


// ================================
// HELPER FUNCTIONS
// ================================
const formatStatus = (status) => {
  const map = {
    inprogress: "In Progress",
    pending:    "Pending",
    done:       "Done",
  };
  return map[status] || capitalize(status);
};

populateCard();
updateTime();

setInterval(() => updateTime(), 30000);
