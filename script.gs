// Game state
const GAME = {
  score: 0,
  lives: 3,
  timeLeft: 60,
  timerRunning: true,
  running: false
};

let playerName = "Pilot"; // default
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Name input overlay
const nameOverlay = document.getElementById("nameInputOverlay");
const nameInput = document.getElementById("playerNameInput");
const startBtn = document.getElementById("startGameBtn");

startBtn.addEventListener("click", () => {
  const val = nameInput.value.trim();
  if (val.length > 0) playerName = val;
  nameOverlay.style.display = "none";
  resetGame();
  speak(`Welcome ${playerName}. Prepare for launch!`);
});

// Speak function
function speak(text, pitch = 1, rate = 1) {
  if (!window.speechSynthesis) return;
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-US";
  msg.pitch = pitch;
  msg.rate = rate;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(msg);
}

// Reset game
function resetGame() {
  GAME.score = 0;
  GAME.lives = 3;
  GAME.timeLeft = 60;
  GAME.timerRunning = true;
  GAME.running = true;
  requestAnimationFrame(gameLoop);
}

// Placeholder game loop
function gameLoop(timestamp) {
  if (!GAME.running) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Timer countdown
  if (GAME.timerRunning) {
    GAME.timeLeft -= 1/60; // assuming 60fps
    if (GAME.timeLeft <= 0) {
      GAME.timeLeft = 0;
      GAME.timerRunning = false;
      winGame();
      return;
    }
  }

  // Display info
  document.getElementById("score").textContent = `Score: ${GAME.score}`;
  document.getElementById("lives").textContent = `Lives: ${GAME.lives}`;
  document.getElementById("timer").textContent = `Time: ${Math.ceil(GAME.timeLeft)}`;

  // Example game mechanics (you can replace with real logic)
  // Draw player
  ctx.fillStyle = "white";
  ctx.fillRect(370, 500, 60, 30);

  requestAnimationFrame(gameLoop);
}

// Victory
function winGame() {
  GAME.running = false;
  const msg = `Mission complete, ${playerName}. Good luck with the rest of your journey.`;
  speak(msg, 1, 0.95);
  showMessage("You Win!", msg);
}

// Game over
function gameOver() {
  GAME.running = false;
  const msg = `Mission failed, ${playerName}. Try again.`;
  speak(msg, 0.9, 0.9);
  showMessage("Game Over", msg);
}

// Simple message display
function showMessage(title, text) {
  ctx.fillStyle = "rgba(0,0,0,0.8)";
  ctx.fillRect(100, 200, 600, 200);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(title, 350, 260);
  ctx.font = "20px Arial";
  ctx.fillText(text, 200, 320);
}
