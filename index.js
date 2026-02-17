import { Player, gameBoard, gameController } from "./tictactoe.js";

const namesForm = document.querySelector("#names-form");
const gameContainer = document.querySelector("#game-container");

namesForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const fstPlayerName = event.target.fstName.value;
  const sndPlayerName = event.target.sndName.value;
  gameController.initialize(fstPlayerName, sndPlayerName);
  drawDisplay(fstPlayerName, sndPlayerName);
});

function drawDisplay(fstPlayerName, sndPlayerName) {
  const tictactoe = document.createElement("div");
  const gameStats = document.createElement("div");
  tictactoe.setAttribute("id", "tictactoe");
  gameStats.setAttribute("id", "gameStats");
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
  const fst = gameController.getPlayer(fstPlayerName);
  const snd = gameController.getPlayer(sndPlayerName);

  gameStats.innerHTML = `
    <p>"${fst.getName()}":"${fst.getWins()}"</p>
    <p>"${snd.getName()}": "${snd.getWins()}"</p>
    <p>Player Turn: "${gameController.getCurrentPlayer()}"</p>
    <button>Pause</button>
    <button>Restart Game</button>
    `;
  gameContainer.appendChild(tictactoe);
  gameContainer.appendChild(gameStats);
}

function startGame() {}

function newMatch() {}

function resumeGame() {}

function pauseGame() {}

function showFinalResult() {}
