const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const guessLeft = document.querySelector(".guess-left span");
const wrongGuess = document.querySelector(".wrong-guess span");
const typingInput = document.querySelector(".typing-input");

let word;
let maxGuesses;
let corrects = [];
let incorrects = [];

function randomWord() {
  let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranObj.word; // getting word of random object
  maxGuesses = 8;
  corrects = [];
  incorrects = [];

  hint.innerText = ranObj.hint;
  guessLeft.innerText = maxGuesses;
  wrongGuess.innerText = incorrects;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
  }
  inputs.innerHTML = html;
}
randomWord();


function initGame(e) {
  let key = e.target.value;
  if (/^[A-Za-z]+$/.test(key) && !incorrects.includes(`${key}`) && !corrects.includes(key)) {
    // console.log(key);
    if (word && word.includes(key)) { 
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          corrects.push(key);
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      maxGuesses--;
      incorrects.push(`${key}`);
    }
    wrongGuess.innerText = incorrects;
    guessLeft.innerText = maxGuesses;
  }
  typingInput.value = "";

   setTimeout(() => {
    if (corrects.length === word.length) {
      alert(`Congrats! You found the word ${word.toUpperCase()}`);
      randomWord();
    } else if (maxGuesses < 1) {
      alert("Game over! You don't have remaining guesses");
      for (let i = 0; i < word.length; i++) {
        //show all letters in the input
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  });
}

resetBtn.addEventListener('click', randomWord);
typingInput.addEventListener('input', initGame);
inputs.addEventListener('click', () => typingInput.focus());
document.addEventListener('keydown', () => typingInput.focus());