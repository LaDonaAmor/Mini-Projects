const toggleBtn = document.getElementById("toggle-btn");

const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const currentTime = document.getElementById("current-time");
const currentDate = document.getElementById("current-date");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  toggleBtn.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
});

const markersContainer = document.querySelector(".markers");

for (let i = 0; i < 12; i++) {
  const mark = document.createElement("div");
  mark.style.transform = `translateX(-50%) rotate(${i * 30}deg)`;
  markersContainer.appendChild(mark);
}

function update() {
  const date = new Date();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  /* Digital Display */
  currentTime.innerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  currentDate.innerHTML = `${day}/${month}/${year}`;

  /* Analog Display */
  const totalHours = (hours % 12) + minutes / 60;
  hourEl.style.transform = `translateX(-50%) rotate(${totalHours * 30}deg)`;

  const totalMinutes = minutes + seconds / 60;
  minuteEl.style.transform = `translateX(-50%) rotate(${totalMinutes * 6}deg)`;

  const totalSeconds = date.getSeconds() + date.getMinutes() * 60;
  secondEl.style.transform = `translateX(-50%) rotate(${totalSeconds * 6}deg)`;
}

function formatTime(num) {
  return String(num).padStart("2", "0");
}

update();
setInterval(update, 1000);
