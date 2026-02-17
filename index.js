import { Player, gameBoard, gameController } from "./tictactoe.js";

const namesForm = document.querySelector("#names-form");
const formContainer = document.querySelector("#form-container");
const gameContainer = document.querySelector("#game-container");

namesForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const fstPlayerName = event.target.fstName.value;
  const sndPlayerName = event.target.sndName.value;
  gameController.initialize(fstPlayerName, sndPlayerName);
  formContainer.classList.add("hidden");
  drawBoard();
  drawPlayersDisplay();
});

function drawBoard() {
  const tictactoe = document.createElement("div");
  tictactoe.setAttribute("id", "tictactoe");
  tictactoe.innerHTML = `
    <div id="game-board">
        <div class="cell" data-cell-index="1"></div>
        <div class="cell" data-cell-index="2"></div>
        <div class="cell" data-cell-index="3"></div>
        <div class="cell" data-cell-index="4"></div>
        <div class="cell" data-cell-index="5"></div>
        <div class="cell" data-cell-index="6"></div>
        <div class="cell" data-cell-index="7"></div>
        <div class="cell" data-cell-index="8"></div>
        <div class="cell" data-cell-index="9"></div>
    </div>
    `;
  const gameStats = document.querySelector("#gameStats");
  if (gameStats) {
    gameContainer.insertBefore(tictactoe, gameStats);
  } else {
    gameContainer.appendChild(tictactoe);
  }
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });
}

function drawPlayersDisplay() {
  const existing = document.querySelector("#gameStats");
  if (existing) existing.remove();
  const gameStats = document.createElement("div");
  gameStats.setAttribute("id", "gameStats");
  const [fst, snd] = gameController.getPlayers();
  gameStats.innerHTML = `
    <p id="fst-score">${fst.getName()}:${fst.getWins()}</p>
    <p id="snd-score">${snd.getName()}:${snd.getWins()}</p>
    <p id="player-turn">Player Turn: ${gameController.getCurrentPlayer().getName()} ${gameController.getCurrentPlayer().getMarker()}</p>
    <p id="message"></p>
    <div id="btn-container">
      <button class="btn" id="toggle-btn">Pause</button>
      <button class="btn" id="new-match-btn">New Match</button>
      <button class="btn" id="new-game-btn">New Game</button>
    </div>
  `;
  gameContainer.appendChild(gameStats);
  document.querySelector("#toggle-btn").addEventListener("click", pauseGame);
  document.querySelector("#new-game-btn").addEventListener("click", newGame);
  document.querySelector("#new-match-btn").addEventListener("click", newMatch);
}

function handleCellClick(event) {
  if (!gameController.gameState()) {
    showMessage("Game is paused!");
    return;
  }
  const currentPlayer = gameController.getCurrentPlayer();
  const index = parseInt(event.target.dataset.cellIndex) - 1;
  const x = Math.floor(index / 3);
  const y = index % 3;
  const result = gameController.playTurn(x, y);
  if (result.state === "Invalid Move") {
    showMessage(result.message);
    return;
  }
  event.target.textContent = currentPlayer.getMarker();
  showMessage("");
  if (result.state === "Win" || result.state === "Tie") {
    showFinalResult(result);
  } else {
    const nextPlayer = gameController.getCurrentPlayer();
    document.querySelector("#player-turn").textContent =
      `Player Turn: ${nextPlayer.getName()} ${nextPlayer.getMarker()}`;
  }
}

function showMessage(msg) {
  document.querySelector("#message").textContent = msg;
}

function showFinalResult(result) {
  const [fst, snd] = gameController.getPlayers();
  document.querySelector("#fst-score").textContent =
    `${fst.getName()}:${fst.getWins()}`;
  document.querySelector("#snd-score").textContent =
    `${snd.getName()}:${snd.getWins()}`;
  showMessage(result.message);
  document.querySelector("#toggle-btn").remove();
}

function newMatch() {
  gameController.newMatch();
  showMessage("");
  document.querySelector("#tictactoe").remove();
  drawBoard();
}

function newGame() {
  gameController.resetGame();
  gameContainer.innerHTML = "";
  formContainer.classList.remove("hidden");
  namesForm.reset();
}

function resumeGame() {
  gameController.toggleGame();
  document.querySelector("#message").textContent = "";
  document.querySelector("#toggle-btn").textContent = "Pause";
  document
    .querySelector("#toggle-btn")
    .removeEventListener("click", resumeGame);
  document.querySelector("#toggle-btn").addEventListener("click", pauseGame);
}

function pauseGame() {
  gameController.toggleGame();
  document.querySelector("#toggle-btn").textContent = "Resume";
  document.querySelector("#toggle-btn").removeEventListener("click", pauseGame);
  document.querySelector("#toggle-btn").addEventListener("click", resumeGame);
}
