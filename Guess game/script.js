const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const guessLeft = document.querySelector(".guess-left span");
const wrongGuess = document.querySelector(".wrong-guess span");
const typingInput = document.querySelector(".typing-input");

let word, maxGuesses, correct = [], incorrects = [];

function randomWord(){
  let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
  let word = ranObj.word; // getting word of random object
  maxGuesses = 8;
  correct = [];
  incorrects = [];
   console.log(word);

  hint.innerHTML = ranObj.hint;
  guessLeft.innerHTML = maxGuesses;
  wrongGuess.innerHTML = incorrects;

  let html = "";
  for (let i = 0; i < word.length; i++) {
   html += `<input type="text" disabled>`;
  }
   inputs.innerHTML = html; 
}
randomWord();


function initGame(e){
let key = e.target.value;
if(/^[A-Za-z]+$/.test(key) && !incorrects.includes(`${key}`) && !correct.includes(`${key}`)){

}
}

resetBtn.addEventListener("click", randomWord);