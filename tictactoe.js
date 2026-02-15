const Player = (() => {
  function create(name, marker) {
    return {
      name,
      marker,
      wins: 0,
      addWin() {
        this.wins++;
      },
      getMarker() {
        return this.marker;
      },
      getName() {
        return this.name;
      },
    };
  }
  return { create };
})();

const gameBoard = (() => {
  const board = createEmptyBoard();

  const createEmptyBoard = () => {
    return Array(3)
      .fill(null)
      .map(() => Array(3).fill(""));
  };
  const placeMarker = (marker, x, y) => {
    board[x][y] = marker;
  };
  const checkIfEmpty = (x, y) => {
    return board[x][y] === "";
  };
  const getBoard = () => {
    return board;
  };
  const getCell = (x, y) => {
    return board[x][y];
  };
  const reset = () => {
    board = createEmptyBoard();
  };
  const isFull = () => {
    return board.every((line) => line.every((cell) => cell !== ""));
  };
  return {
    placeMarker,
    checkIfEmpty,
    isFull,
    reset,
    getCell,
    getBoard,
    createEmptyBoard,
  };
})();

const gameController = ((board, createPlayer) => {
  const players = [];
  let currentTurn = 0;
  let activeGame = false;

  const initialize = (name1, name2) => {
    players.length = 0;
    players.push(createPlayer(name1, "X"));
    players.push(createPlayer(name2, "O"));
    board.reset();
    activeGame = true;
  };
  const playTurn = (x, y) => {
    if (!activeGame) {
      return {
        message: "Game Not Initialized!",
        state: "Error",
      };
    }
    const currentPlayer = players[currentTurn];
    if (board.checkIfEmpty(x, y)) {
      return { message: "Occupied Position!", state: "Invalid Move" };
    }

    board.placeMarker(currentPlayer.getMarker(), x, y);
    const winner = checkForWinner();

    if (winner) {
      currentPlayer.addWin();
      activeGame = false;
      return { message: `Winner:${currentPlayer.getName()}`, state: "Win" };
    } else if (board.isFull()) {
      activeGame = false;
      return { message: "Tie!", state: "Tie" };
    } else {
      currentTurn = (currentTurn + 1) % 2;
      return {
        message: `Next player: ${players[currentTurn].getName()}`,
        state: "Playing",
      };
    }
  };
  const getCurrentPlayer = () => {
    return players[currentTurn];
  };
  const getPlayers = () => {
    return players;
  };
  const newMatch = () => {
    board.reset();
    currentTurn = 0;
    activeGame = true;
  };
  const resetGame = () => {
    board.reset();
    currentTurn = 0;
    activeGame = false;
    players.length = 0;
  };
  const checkForWinner = () => {
    const boardStatus = board.getBoard();
    //Check lines
    for (let i = 0; i < 3; i++) {
      if (
        boardStatus[i][0] === boardStatus[i][1] &&
        boardStatus[i][0] === boardStatus[i][2]
      ) {
        return true;
      }
    }
    //Check rows
    for (let j = 0; i < 3; i++) {
      if (
        boardStatus[0][j] === boardStatus[1][j] &&
        boardStatus[1][j] === boardStatus[2][j]
      ) {
        return true;
      }
    }
    //Check diagonals

    //left to right
    if (
      boardStatus[0][0] === boardStatus[1][1] &&
      boardStatus[1][1] === boardStatus[2][2]
    ) {
      return true;
    }
    //right to left
    if (
      boardStatus[0][2] === boardStatus[1][1] &&
      boardStatus[1][1] === boardStatus[2][0]
    ) {
      return true;
    }

    return false;
  };
  return {
    initialize,
    playTurn,
    checkForWinner,
    resetGame,
    newMatch,
    getCurrentPlayer,
    getPlayers,
  };
})(gameBoard, Player.create);
