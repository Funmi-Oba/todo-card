# Todo Item Card

A high-fidelity, interactive Todo Item Card built with semantic HTML, vanilla CSS, and vanilla JavaScript. Built as a Stage 0 frontend task for my internship.

## Live Demo
[View Live](https://funmi-oba.github.io/todo-card/)

## GitHub Repo
[View Code](https://github.com/Funmi-Oba/todo-card)

---

## How to Run Locally

1. Clone the repository:
   git clone https://github.com/yourusername/todo-card.git

2. Open the project folder:
   cd todo-card

3. Open index.html in your browser.
   No installations, no build tools, no dependencies needed.

---

## Decisions Made

- Used semantic HTML elements throughout — article, h2, p, time, ul, li, button — for accessibility and readability.
- Used a real input type checkbox styled as a toggle switch, satisfying the requirement for a real checkbox while looking modern.
- All data-testid attributes match the exact specification provided for automated testing compatibility.
- Task data is stored in a single JavaScript object at the top of script.js making it easy to update.
- Time remaining is calculated dynamically on load and refreshes every 30 seconds using setInterval so it stays accurate without a page reload.
- Due date is set to end of day (23:59:59) so a task due "today" remains valid for the full day.
- CSS classes like urgent, soon, safe, and overdue are applied dynamically by JavaScript to color-code the time remaining badge.

---

## Trade-offs

- Task data is hardcoded in the JavaScript object. In a real app this would come from an API or database.
- Edit button currently shows an alert. In a real app it would open a form to update the task.
- No persistent storage — refreshing the page resets the card to its original state.

---

## Built With
- HTML5
- CSS3
- Vanilla JavaScript