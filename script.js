document.addEventListener("DOMContentLoaded", function () {

  // WELCOME SCREEN
  const startBtn = document.getElementById("startBtn");
  const welcomeScreen = document.getElementById("welcomeScreen");
  const dashboard = document.getElementById("dashboard");

  startBtn.addEventListener("click", function () {
    welcomeScreen.classList.add("fade-out");
    setTimeout(function () {
      welcomeScreen.style.display = "none";
      dashboard.classList.remove("hidden");
    }, 800);
  });

  // DASHBOARD ELEMENTS
  const calendar = document.getElementById("calendar");
  const monthTitle = document.getElementById("monthTitle");
  const greetingRight = document.getElementById("greetingRight");
  const taskList = document.getElementById("taskList");
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTask");
  const progressCircle = document.querySelector(".progress-circle");
  const progressText = document.getElementById("progressText");
  const motivationNote = document.getElementById("motivationNote");

  let selectedDate = new Date();

  const motivations = [
    "Small steps still move you forward.",
    "Consistency is quiet power.",
    "You are allowed to grow slowly.",
    "Rest is productive too.",
    "Progress doesn't have to be loud."
  ];

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  function renderCalendar() {
    calendar.innerHTML = "";
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    monthTitle.textContent = selectedDate.toLocaleString("default", { month: "long", year: "numeric" });

    for (let i = 0; i < firstDay; i++) {
      calendar.innerHTML += "<div></div>";
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const div = document.createElement("div");
      div.textContent = day;

      if (formatDate(date) === formatDate(new Date())) {
        div.classList.add("today");
      }

      if (formatDate(date) === formatDate(selectedDate)) {
        div.classList.add("selected-date");
      }

      div.addEventListener("click", () => {
        selectedDate = date;
        renderAll();
      });

      calendar.appendChild(div);
    }
  }

  function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || {};
  }

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    const tasks = getTasks();
    const dateKey = formatDate(selectedDate);
    const todaysTasks = tasks[dateKey] || [];

    let completed = 0;

    todaysTasks.forEach((task, index) => {
        // Add small dot if the date has tasks
const tasks = getTasks();
const dateKeyStr = formatDate(date);
if (tasks[dateKeyStr] && tasks[dateKeyStr].length > 0) {
  const dot = document.createElement("span");
  dot.classList.add("task-dot");
  div.appendChild(dot);
}

      const li = document.createElement("li");
      li.textContent = task.text;

      if (task.done) {
        li.style.textDecoration = "line-through";
        completed++;
      }

      li.addEventListener("click", () => {
        task.done = !task.done;
        saveTasks(tasks);
        renderAll();
      });

      taskList.appendChild(li);
    });

    updateProgress(todaysTasks.length, completed);
  }

  function updateProgress(total, done) {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    const offset = circumference - (circumference * percent) / 100;
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = offset;
    progressText.textContent = percent + "%";
  }

  addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return;

    const tasks = getTasks();
    const dateKey = formatDate(selectedDate);

    if (!tasks[dateKey]) tasks[dateKey] = [];
    tasks[dateKey].push({ text, done: false });

    saveTasks(tasks);
    taskInput.value = "";
    renderAll();
  });

  function updateGreeting() {
    greetingRight.textContent = "Today's Focus";
  }

  function updateMotivation() {
    const index = selectedDate.getDate() % motivations.length;
    motivationNote.textContent = motivations[index];
  }

  function renderAll() {
    renderCalendar();
    renderTasks();
    updateGreeting();
    updateMotivation();
  }

  renderAll();
});
// FADE-IN DASHBOARD CARDS
const dashboardCards = document.querySelectorAll(".dashboard > div, .calendar-card, .progress-card, .right-column");

function fadeInDashboard() {
  dashboardCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, 200 * index); // stagger by 200ms
  });
}

// Call fadeInDashboard after dashboard is visible
startBtn.addEventListener("click", function () {
  welcomeScreen.classList.add("fade-out");
  setTimeout(function () {
    welcomeScreen.style.display = "none";
    dashboard.classList.remove("hidden");
    fadeInDashboard(); // <-- fade-in triggered
  }, 800);
});

