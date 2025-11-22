// Confetti animation
const confetti = document.querySelector(".confetti");
const colors = ["#ff6b6b", "#ffd300", "#4ecdc4", "#45b7d1", "#ff9a9e"];

for (let i = 0; i < 50; i++) {
  const piece = document.createElement("div");
  piece.classList.add("confetti-piece");
  piece.style.left = `${Math.random() * 100}%`;
  piece.style.background = colors[Math.floor(Math.random() * colors.length)];
  piece.style.animationDelay = `${Math.random() * 3}s`;
  piece.style.animationDuration = `${3 + Math.random() * 2}s`;
  piece.style.width = `${5 + Math.random() * 10}px`;
  piece.style.height = `${10 + Math.random() * 20}px`;
  confetti.appendChild(piece);
}
