
const selectFriendBtn = document.querySelector(".choice1");
const selectComputerBtn = document.querySelector(".choice2");
const selection = document.querySelector(".start-game");
const playersChoice = document.querySelector(".player");
const playBoard = document.querySelector(".play-board");
const playerXBtn = document.querySelector(".player-x");
const playerOBtn = document.querySelector(".player-o");
const allBox = document.querySelectorAll("section span");
const players = document.querySelector(".players");
const slider = document.querySelector(".slider");
const resultBox = document.querySelector(".result-box");
const wonText = resultBox.querySelector(".won-text p");
const replayBtn = resultBox.querySelector("button");

let currentPlayer = "X";
let playWithComputer = false;
let computerPlayer = "";

window.onload = () => {
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }

  selectFriendBtn.onclick = () => {
    selection.classList.add("hide");
    playersChoice.classList.add("show");
    playWithComputer = false;
  };

  selectComputerBtn.onclick = () => {
    selection.classList.add("hide");
    playersChoice.classList.add("show");
    playWithComputer = true;
  };

  playerXBtn.onclick = () => {
    playersChoice.classList.remove("show");
    playBoard.classList.add("show");
    setCurrentPlayer("X");
    computerPlayer = "O";
  };

  playerOBtn.onclick = () => {
    playersChoice.classList.remove("show");
    playBoard.classList.add("show");
    setCurrentPlayer("O");
    computerPlayer = "X";
  };

  replayBtn.onclick = resetGame;
};

function setCurrentPlayer(player) {
  currentPlayer = player;
  if (currentPlayer === "X") {
    slider.classList.add("move-to-x");
    slider.classList.remove("move-to-o");
    players.classList.add("x-active");
    players.classList.remove("o-active");
  } else {
    slider.classList.add("move-to-o");
    slider.classList.remove("move-to-x");
    players.classList.add("o-active");
    players.classList.remove("x-active");
  }
}

function clickedBox(element) {
  if (element.innerHTML !== "" || resultBox.classList.contains("show")) {
    return;
  }

  if (currentPlayer === "X") {
    element.innerHTML = `<i class="fas fa-times"></i>`;
  } else {
    element.innerHTML = `<i class="far fa-circle"></i>`;
  }

  element.setAttribute("id", currentPlayer);
  element.style.pointerEvents = "none";

  if (checkWinner()) return;

  if ([...allBox].every((box) => box.childElementCount > 0)) {
    wonText.textContent = "Game Draw!";
    resultBox.classList.add("show");
    playBoard.classList.remove("show");
    disableBoxes();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (currentPlayer === "X") {
    slider.classList.add("move-to-x");
    slider.classList.remove("move-to-o");
    players.classList.add("x-active");
    players.classList.remove("o-active");
  } else {
    slider.classList.add("move-to-o");
    slider.classList.remove("move-to-x");
    players.classList.add("o-active");
    players.classList.remove("x-active");
  }

  if (playWithComputer && currentPlayer === computerPlayer) {
    playBoard.style.pointerEvents = "none";
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  let emptyBoxes = [];
  for (let i = 0; i < allBox.length; i++) {
    if (allBox[i].childElementCount === 0) emptyBoxes.push(allBox[i]);
  }
  if (emptyBoxes.length === 0) return;

  let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];

  if (computerPlayer === "X") {
    randomBox.innerHTML = `<i class="fas fa-times"></i>`;
  } else {
    randomBox.innerHTML = `<i class="far fa-circle"></i>`;
  }

  randomBox.setAttribute("id", computerPlayer);
  randomBox.style.pointerEvents = "none";

  if (checkWinner()) return;

  if ([...allBox].every((box) => box.childElementCount > 0)) {
    wonText.textContent = "Game Draw!";
    resultBox.classList.add("show");
    playBoard.classList.remove("show");
    disableBoxes();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (currentPlayer === "X") {
    slider.classList.add("move-to-x");
    slider.classList.remove("move-to-o");
    players.classList.add("x-active");
    players.classList.remove("o-active");
  } else {
    slider.classList.add("move-to-o");
    slider.classList.remove("move-to-x");
    players.classList.add("o-active");
    players.classList.remove("x-active");
  }
  playBoard.style.pointerEvents = "auto";
}

function getId(num) {
  return document.querySelector(".box" + num).id;
}

function checkPattern(val1, val2, val3, sign) {
  return getId(val1) === sign && getId(val2) === sign && getId(val3) === sign;
}

function checkWinner() {
  for (let sign of ["X", "O"]) {
    if (
      checkPattern(1, 2, 3, sign) ||
      checkPattern(4, 5, 6, sign) ||
      checkPattern(7, 8, 9, sign) ||
      checkPattern(1, 4, 7, sign) ||
      checkPattern(2, 5, 8, sign) ||
      checkPattern(3, 6, 9, sign) ||
      checkPattern(1, 5, 9, sign) ||
      checkPattern(3, 5, 7, sign)
    ) {
      wonText.textContent = "Player" + " " + sign + " Wins!";
      resultBox.classList.add("show");
      playBoard.classList.remove("show");
      disableBoxes();
      return true;
    }
  }
  return false;
}

function disableBoxes() {
  for (let box of allBox) {
    box.style.pointerEvents = "none";
  }
}

function resetGame() {
  for (let box of allBox) {
    box.innerHTML = "";
    box.removeAttribute("id");
    box.style.pointerEvents = "auto";
  }
  resultBox.classList.remove("show");
  selection.classList.remove("hide");

  playBoard.classList.remove("show");
  playersChoice.classList.remove("show");

  setCurrentPlayer("X");
  playBoard.style.pointerEvents = "auto";
}
