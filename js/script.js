const words = [
  "kissa", 
  "haaveilla",
  "koira", 
  "kirjahylly",
  "auto", 
  "vinyylisoitin",
  "koulu", 
  "lasagne",
  "kirja",
  "jäätelöauto",
];

let randomizedWord = "";
let maskedWord = "";
let guesses = 0;

// Käyttöliittymäelementit
const wordDisplay = document.getElementById("wordDisplay");
const guessInput = document.getElementById("guessInput");
const guessForm = document.getElementById("guessForm");
const message = document.getElementById("message");
const guessCount = document.getElementById("guessCount");
const newGameButton = document.getElementById("newGameButton");

function newGame() {
  const randomIndex = Math.floor(Math.random() * words.length);
  randomizedWord = words[randomIndex];
  
  maskedWord = "*".repeat(randomizedWord.length);
  wordDisplay.textContent = maskedWord;
  
  guesses = 0;
  guessCount.textContent = guesses;

  // Piilota viesti ja uusi peli -painike
  message.textContent = '';
  newGameButton.style.display = 'none';
}

function replaceFoundChars(guess) {
  let newMaskedWord = maskedWord.split("");
  
  for (let i = 0; i < randomizedWord.length; i++) {
    if (randomizedWord[i] === guess) {
      newMaskedWord[i] = guess;
    }
  }
  
  maskedWord = newMaskedWord.join("");
  wordDisplay.textContent = maskedWord;
}

function win() {
  // Näytä voittoviesti
  message.textContent = `Onnittelut! Oikea sana oli "${randomizedWord}". Sinä teit ${guesses} arvausta.`;
  
  // Näytä "Uusi peli" -painike
  newGameButton.style.display = 'block';
}

guessForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const guess = guessInput.value.toLowerCase().trim();
  guessInput.value = ""; 

  if (guess === "") {
    message.textContent = "Syötä arvaus!";
    return;
  }
  
  if (guess.length > 1) {
    if (guess === randomizedWord) {
      win();
    } else {
      message.textContent = "Väärä sana!";
    }
  } else {
    if (randomizedWord.includes(guess)) {
      replaceFoundChars(guess);
      message.textContent = "";
    } else {
      message.textContent = "Kirjainta ei löytynyt sanasta.";
    }
  }

  guesses++;
  guessCount.textContent = guesses;

  if (maskedWord === randomizedWord) {
    win();
  }
});

// Kun käyttäjä klikkaa "Uusi peli" -painiketta
newGameButton.addEventListener("click", newGame);

// Aloita uusi peli, kun sivu ladataan
newGame();

