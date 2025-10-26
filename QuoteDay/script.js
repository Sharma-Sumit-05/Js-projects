const quoteText = document.querySelector(".quote");
const quoteBtn = document.querySelector("#next-quote");
const authorName = document.querySelector(".name");
const soundBtn = document.querySelector(".sound");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");

 let currentIndex = 0;
function randomQuote(){
 quoteBtn.innerHTML = "Loading Quote";
 quoteBtn.disabled = true;
quoteBtn.style.border = "2px solid black";


 setTimeout(() => {
   let quoteStorage = quoteList[Math.floor(Math.random() * quoteList.length)];

  let quotes = quoteStorage.quotes;
  quoteText.textContent = `"${quoteStorage.quotes}"`;
  authorName.textContent = quoteStorage.author;
  quoteBtn.innerHTML = "New Quote";
  quoteBtn.disabled = false;
 }, 800);
}
randomQuote();

soundBtn.addEventListener("click", () => {
  const quote = quoteText.textContent;
  const author = authorName.textContent;
  const utterance = new SpeechSynthesisUtterance(`${quote} by ${author}`);
  speechSynthesis.speak(utterance);
});

copyBtn.addEventListener("click", () => {
  const quote = quoteText.textContent;
  navigator.clipboard.writeText(quote);
});

twitterBtn.addEventListener("click", () => {
  const quote = quoteText.textContent;
  const author = authorName.textContent;

  const tweetText = `${quote} — ${author}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&hashtags=quotes,inspiration`;

  window.open(twitterUrl, "_blank");
})

quoteBtn.addEventListener("click", randomQuote);