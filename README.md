# Todo Item Card

A high-fidelity, interactive Todo Item Card built with semantic HTML, vanilla CSS, and vanilla JavaScript. Built as a Stage 0 & Stage 1A frontend task for my internship.

## Live Demo
[View Live](https://funmi-oba.github.io/todo-card/)

## GitHub Repo
[View Code](https://github.com/Funmi-Oba/todo-card)

---

## How to Run Locally

1. Clone the repository:
   git clone https://github.com/Funmi-Oba/todo-card.git

2. Open the project folder:
   cd todo-card

3. Open index.html in your browser.
   No installations, no build tools, no dependencies needed.

---

## What Changed from Stage 0

- Added full edit mode — clicking Edit opens an inline form to update title, description, priority and due date. Save updates the card, Cancel restores previous values.
- Added interactive status control — a dropdown that lets the user change status between Pending, In Progress and Done.
- Status, checkbox and status control are fully synced — changing one updates all others automatically.
- Added priority indicator — a colored dot and left border accent that visually changes based on priority level (red for high, amber for medium, green for low).
- Added expand/collapse behavior — long descriptions are collapsed by default with a Show more/Show less toggle button.
- Enhanced time logic — now shows granular time remaining in days, hours or minutes depending on how close the deadline is.
- Added overdue indicator — a visible red badge appears and the card background changes when the task is past its due date.
- Time remaining stops updating and shows "Completed" when status is set to Done.
- Edit button returns focus to itself after the form closes — accessibility improvement.

---

## Decisions Made

- Used semantic HTML elements throughout — article, h2, p, time, ul, li, button — for accessibility and readability.
- Used a real input type checkbox styled as a toggle switch, satisfying the requirement for a real checkbox while looking modern.
- All data-testid attributes match the exact specification provided for automated testing compatibility.
- Task data is stored in a single JavaScript object at the top of script.js making it easy to update.
- A single syncStatus() function handles all status changes to keep checkbox, badge and dropdown in sync at all times.
- Time remaining is calculated dynamically on load and refreshes every 30 seconds using setInterval.
- Due date is set to end of day (23:59:59) so a task due "today" remains valid for the full day.
- CSS classes like urgent, soon, safe and overdue are applied dynamically by JavaScript to color-code the time remaining badge.
- Expand/collapse uses max-height transition instead of display:none so the animation is smooth.

---

## Trade-offs

- Task data is hardcoded in the JavaScript object. In a real app this would come from an API or database.
- No persistent storage — refreshing the page resets the card to its original state.
- Edit form does basic validation (empty title check) but does not validate date format or description length.
- Tags cannot be edited from the edit form in this version.

---

## Accessibility Notes

- Toggle switch uses a real input type checkbox under the hood for screen reader compatibility.
- Edit form returns focus to the Edit button when closed so keyboard users don't lose their position.
- Status control and all interactive elements have aria-label attributes.
- Overdue indicator uses aria-live="polite" so screen readers announce changes without interrupting.
- Expand toggle uses aria-expanded to communicate collapsed or expanded state to screen readers.

---

## Known Limitations

- Tags are not editable through the UI.
- No confirmation before saving edits.
- Time granularity stops at minutes — does not count seconds.

---

## Built With
- HTML5
- CSS3
- Vanilla JavaScript