// Array of words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  // "Coding",
  // "Funny",
  // "Working",
  // "Dependencies",
  // "Task",
  // "Runner",
  // "Roles",
  // "Test",
  // "Rust",
  // "Playing",
];
// levels object
const levels = {
  easy: 10,
  normal: 7,
  hard: 3,
};
// Select elements
const playSection = document.querySelector(".play"),
  startBtn = document.querySelector("button"),
  level = document.querySelector("select"),
  levelSpan = document.querySelector(".lvl"),
  controlSection = document.querySelector(".control"),
  timeSpan = document.querySelector(".time span"),
  word = document.querySelector(".the-word"),
  inputElement = document.querySelector("input"),
  upcomingWords = document.querySelector(".upcoming-words"),
  footer = document.querySelector("footer"),
  gotSpan = document.querySelector(".got"),
  totalSpan = document.querySelector(".total");

let counter,
  firstTimer = true;

// actions on start
inputElement.value = "";
levelSpan.textContent = level.value;
gotSpan.textContent = 0;
totalSpan.textContent = words.length;
startBtn.focus();

// Clicking start
startBtn.addEventListener("click", () => {
  // remove play section
  playSection.remove();
  // show word, inputElement and upcommingWords
  word.classList.add("show");
  inputElement.classList.add("show");
  upcomingWords.classList.add("show");
  // focus on the input
  inputElement.focus();
  // show control section
  controlSection.classList.add("show");
  // get words
  getWords();
});

level.addEventListener("change", () => {
  levelSpan.textContent = level.value;
});

// prevent from pasting
inputElement.addEventListener("paste", () => {
  return false;
});

function getWords() {
  if (firstTimer) {
    timeSpan.textContent = levels[level.value];
    word.classList.add("bad");
    word.textContent = 3;
    for (let i of words) {
      const wordSpan = document.createElement("span");
      wordSpan.textContent = i;
      upcomingWords.appendChild(wordSpan);
    }
    let firstCounter = setInterval(() => {
      word.textContent--;
      if (word.textContent == 0) {
        clearInterval(firstCounter);
      }
    }, 1000);
    setTimeout(() => {
      firstTimer = false;
      word.classList.remove("bad");
      document.addEventListener("keydown", (e) => {
        if (
          e.key == "Enter" &&
          getComputedStyle(inputElement)["display"] != "none"
        ) {
          clearInterval(counter);
          compare();
        }
      });
      getWords();
    }, 3000);
  } else {
    randomWord = words[Math.floor(Math.random() * words.length)];
    word.textContent = randomWord.toLowerCase();
    randomWordIndx = words.indexOf(randomWord);
    words.splice(randomWordIndx, 1);
    upcomingWords.textContent = "";
    for (let i of words) {
      const wordSpan = document.createElement("span");
      wordSpan.textContent = i;
      upcomingWords.appendChild(wordSpan);
    }
    // start play
    startPlay();
  }
}

function startPlay() {
  timeSpan.textContent = levels[level.value];
  counter = setInterval(() => {
    timeSpan.textContent--;
    if (timeSpan.textContent == 0) {
      clearInterval(counter);
      compare();
    }
  }, 1000);
}

function compare() {
  if (inputElement.value.toLowerCase() === word.textContent) {
    gotSpan.textContent++;
    if (words.length == 0) {
      word.textContent = "Congratulations!";
      word.classList.add("good");
      inputElement.value = "";
      inputElement.setAttribute("disabled", "disabled");
    } else {
      inputElement.value = "";
      getWords();
    }
  } else {
    inputElement.setAttribute("disabled", "disabled");
    word.textContent = "Game over!";
    word.classList.add("bad");
  }
}
