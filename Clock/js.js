const toggleBtn = document.getElementById("toggle-btn");

const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const currentTime = document.getElementById("current-time");
const currentDate = document.getElementById("current-date");

toggleBtn.addEventListener("click", () => {
  document.querySelector("html").classList.toggle("dark");

  if (toggleBtn.innerText.trim() === "Dark Mode") {
    toggleBtn.innerText = "Light Mode";
  } else {
    toggleBtn.innerText = "Dark Mode";
  }
});

update();
setInterval(update, 1000);

function update() {
  const date = new Date();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  currentTime.innerText = `${formatTime(hours)}:${formatTime(
    minutes
  )}:${formatTime(seconds)}`;
  currentDate.innerHTML = `${day}/${month}/${year}`;

  hourEl.style.transform = `translate(-50%, -100%) 
    rotate(${(360 * (hours % 12)) / 12}deg)`;

  minuteEl.style.transform = `translate(-50%, -100%) 
    rotate(${(360 * minutes) / 60}deg)`;

  secondEl.style.transform = `translate(-50%, -100%) 
    rotate(${(360 * seconds) / 60}deg)`;
}

function formatTime(num) {
  return String(num).padStart("2", "0");
}


