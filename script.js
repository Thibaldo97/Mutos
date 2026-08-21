// ==========================================
// 1. CONFIGURATION DU JEU ET CALENDRIER
// ==========================================
const MAX_ATTEMPTS = 6;
const STORAGE_KEY = "sutom_daily_game";
const STREAK_KEY = "sutom_user_streak";

const START_DATE = new Date("2026-08-21");

const WORD_CALENDAR = {
  "2026-08-21": "LIVRE",
  "2026-08-22": "CHOCOLAT",
  "2026-08-23": "PARAPLUIE",
  "2026-08-24": "MAISON",
  "2026-08-25": "PLAGE",
};

const FALLBACK_WORD = "SUTOM";

const KEYBOARD_LAYOUT = [
  ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
  ["ENTER", "W", "X", "C", "V", "B", "N", "BACKSPACE"]
];

// ==========================================
// 2. VARIABLES D'ÉTAT GLOBALES
// ==========================================
let currentDayIndex = -1;
let SECRET_WORD = "";
let WORD_LENGTH = 0;
let currentAttempt = 0;
let currentGuess = "";
let gameOver = false;
let guessesHistory = [];
let keyStateMap = {}; // Conserve l'état de chaque lettre pour le clavier

// Éléments du DOM
const grid = document.getElementById("grid");
const messageEl = document.getElementById("message");
const dayNumberEl = document.getElementById("day-number");
const shareBtn = document.getElementById("share-btn");
const streakCountEl = document.getElementById("streak-count");
const keyboardEl = document.getElementById("keyboard");

// ==========================================
// 3. GESTION DU STREAK
// ==========================================
function getStreakData() {
  const saved = localStorage.getItem(STREAK_KEY);
  if (!saved) return { count: 0, lastDayPlayed: -1 };
  try {
    return JSON.parse(saved);
  } catch (e) {
    return { count: 0, lastDayPlayed: -1 };
  }
}

function updateStreakDisplay() {
  const { count, lastDayPlayed } = getStreakData();
  if (lastDayPlayed !== -1 && currentDayIndex - lastDayPlayed > 1) {
    saveStreak(0, lastDayPlayed);
    if (streakCountEl) streakCountEl.textContent = 0;
  } else {
    if (streakCountEl) streakCountEl.textContent = count;
  }
}

function saveStreak(count, dayPlayed) {
  localStorage.setItem(STREAK_KEY, JSON.stringify({
    count: count,
    lastDayPlayed: dayPlayed
  }));
  if (streakCountEl) streakCountEl.textContent = count;
}

function incrementStreak() {
  const { count, lastDayPlayed } = getStreakData();
  if (lastDayPlayed !== currentDayIndex) {
    const newCount = (currentDayIndex - lastDayPlayed === 1) ? count + 1 : 1;
    saveStreak(newCount, currentDayIndex);
  }
}

// ==========================================
// 4. FONCTIONS DATES & SAUVEGARDE
// ==========================================
function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDayInfo() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateKey = getFormattedDate(today);
  const start = new Date(START_DATE);
  start.setHours(0, 0, 0, 0);
  
  const diffTime = today - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const dayNumber = Math.max(1, diffDays + 1);

  const word = WORD_CALENDAR[dateKey] || FALLBACK_WORD;

  return { dayNumber, word, diffDays };
}

function saveGameState() {
  const gameState = {
    dayIndex: currentDayIndex,
    guesses: Array.from(grid.children)
      .slice(0, currentAttempt)
      .map(row => Array.from(row.children).map(cell => cell.textContent).join("")),
    gameOver: gameOver,
    hasWon: currentGuess === SECRET_WORD
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
}

function loadGameState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;

  try {
    const gameState = JSON.parse(saved);
    if (gameState.dayIndex === currentDayIndex) {
      return gameState;
    }
  } catch (e) {
    console.error("Erreur de lecture de la sauvegarde", e);
  }
  return null;
}

// ==========================================
// 5. INITIALISATION DU JEU & CLAVIER
// ==========================================
function setupDailyGame() {
  const { dayNumber, word, diffDays } = getDayInfo();

  if (currentDayIndex === diffDays) return;

  currentDayIndex = diffDays;
  SECRET_WORD = word.toUpperCase();
  WORD_LENGTH = SECRET_WORD.length;
  currentAttempt = 0;
  currentGuess = "";
  gameOver = false;
  guessesHistory = [];
  keyStateMap = {};

  if (dayNumberEl) dayNumberEl.textContent = `n°${dayNumber}`;
  if (shareBtn) shareBtn.style.display = "none";

  initGrid();
  createKeyboard();
  setMessage("");
  updateStreakDisplay();

  const savedState = loadGameState();
  if (savedState) {
    savedState.guesses.forEach(guess => {
      currentGuess = guess;
      submitGuess(true);
    });

    if (savedState.gameOver) {
      gameOver = true;
      if (savedState.hasWon) {
        setMessage("Gagné ! 🎉");
      } else {
        setMessage(`Perdu ! Le mot était : ${SECRET_WORD}`);
      }
      showShareButton();
    }
  }
}

function initGrid() {
  grid.innerHTML = ""; 

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const row = document.createElement("div");
    row.className = "row";
    row.style.gridTemplateColumns = `repeat(${WORD_LENGTH}, 1fr)`;

    for (let j = 0; j < WORD_LENGTH; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}

function createKeyboard() {
  if (!keyboardEl) return;
  keyboardEl.innerHTML = "";

  KEYBOARD_LAYOUT.forEach(rowKeys => {
    const rowEl = document.createElement("div");
    rowEl.className = "keyboard-row";

    rowKeys.forEach(key => {
      const keyBtn = document.createElement("button");
      keyBtn.className = "key";
      keyBtn.dataset.key = key;

      if (key === "ENTER") {
        keyBtn.textContent = "ENTRÉE";
        keyBtn.classList.add("key-large");
      } else if (key === "BACKSPACE") {
        keyBtn.textContent = "⌫";
        keyBtn.classList.add("key-large");
      } else {
        keyBtn.textContent = key;
      }

      keyBtn.addEventListener("click", () => handleInput(key));
      rowEl.appendChild(keyBtn);
    });

    keyboardEl.appendChild(rowEl);
  });
}

function updateKeyboardColors() {
  if (!keyboardEl) return;
  const keys = keyboardEl.querySelectorAll(".key");

  keys.forEach(keyBtn => {
    const keyVal = keyBtn.dataset.key;
    const state = keyStateMap[keyVal];

    if (state) {
      keyBtn.classList.remove("correct", "present", "absent");
      keyBtn.classList.add(state);
    }
  });
}

function updateRow() {
  setMessage("");
  const row = grid.children[currentAttempt];
  for (let i = 0; i < WORD_LENGTH; i++) {
    const cell = row.children[i];
    const prevChar = cell.textContent;
    const newChar = currentGuess[i] || "";

    cell.textContent = newChar;

    if (newChar !== "" && prevChar === "") {
      cell.classList.add("pop");
      setTimeout(() => cell.classList.remove("pop"), 100);
    }
  }
}

function triggerShake() {
  const row = grid.children[currentAttempt];
  row.classList.add("shake");
  setTimeout(() => row.classList.remove("shake"), 400);
}

// ==========================================
// 6. GESTION DES ENTRÉES
// ==========================================
function handleInput(key) {
  if (gameOver) return;

  const upperKey = key.toUpperCase();

  if (upperKey === "ENTER") {
    if (currentGuess.length === WORD_LENGTH) {
      submitGuess();
    } else {
      triggerShake();
      setMessage(`Le mot doit faire ${WORD_LENGTH} lettres !`);
    }
  } else if (upperKey === "BACKSPACE") {
    currentGuess = currentGuess.slice(0, -1);
    updateRow();
  } else if (/^[A-Z]$/.test(upperKey) && currentGuess.length < WORD_LENGTH) {
    currentGuess += upperKey;
    updateRow();
  }
}

document.addEventListener("keydown", (e) => {
  handleInput(e.key);
});

function submitGuess(isRestoring = false) {
  const row = grid.children[currentAttempt];
  const targetLetters = SECRET_WORD.split("");
  const guessLetters = currentGuess.split("");
  const result = Array(WORD_LENGTH).fill("absent");

  // Pass 1: Lettres bien placées (Rouge)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      result[i] = "correct";
      targetLetters[i] = null;
    }
  }

  // Pass 2: Lettres mal placées (Jaune)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] !== "correct") {
      const index = targetLetters.indexOf(guessLetters[i]);
      if (index !== -1) {
        result[i] = "present";
        targetLetters[index] = null;
      }
    }
  }

  // Application aux cases et enregistrement pour le clavier
  for (let i = 0; i < WORD_LENGTH; i++) {
    const cell = row.children[i];
    const letter = guessLetters[i];
    const status = result[i];

    cell.textContent = letter;

    if (!isRestoring) {
      setTimeout(() => {
        cell.classList.add("flip", status);
      }, i * 200);
    } else {
      cell.classList.add(status);
    }

    // Mise à jour de la priorité de couleur pour le clavier : correct > present > absent
    const currentState = keyStateMap[letter];
    if (status === "correct") {
      keyStateMap[letter] = "correct";
    } else if (status === "present" && currentState !== "correct") {
      keyStateMap[letter] = "present";
    } else if (status === "absent" && !currentState) {
      keyStateMap[letter] = "absent";
    }
  }

  // Mise à jour des couleurs du clavier
  const colorDelay = isRestoring ? 0 : WORD_LENGTH * 200;
  setTimeout(updateKeyboardColors, colorDelay);

  // Historique émoji
  const emojiMap = { correct: "🟥", present: "🟨", absent: "🟦" };
  const rowEmojis = result.map(type => emojiMap[type]).join("");
  guessesHistory.push(rowEmojis);

  // Conditions de fin de partie
  if (currentGuess === SECRET_WORD) {
    gameOver = true;
    incrementStreak();

    setTimeout(() => {
      row.classList.add("win");
      if (!isRestoring) setMessage("Gagné ! 🎉");
      showShareButton();
    }, colorDelay);

  } else if (currentAttempt === MAX_ATTEMPTS - 1) {
    gameOver = true;
    setTimeout(() => {
      if (!isRestoring) setMessage(`Perdu ! Le mot était : ${SECRET_WORD}`);
      showShareButton();
    }, colorDelay);

  } else {
    currentAttempt++;
    currentGuess = "";
  }

  if (!isRestoring) {
    saveGameState();
  }
}

function setMessage(msg) {
  messageEl.textContent = msg;
}

// ==========================================
// 7. PARTAGE DE SCORE
// ==========================================
function generateShareText() {
  const { dayNumber } = getDayInfo();
  const { count } = getStreakData();
  const score = (currentGuess === SECRET_WORD) ? guessesHistory.length : "X";
  
  let text = `SUTOM n°${dayNumber} ${score}/${MAX_ATTEMPTS} 🔥 ${count}\n\n`;
  text += guessesHistory.join("\n");
  
  return text;
}

function showShareButton() {
  if (!shareBtn) return;
  shareBtn.style.display = "inline-block";
  
  shareBtn.onclick = () => {
    const textToCopy = generateShareText();
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setMessage("Score copié dans le presse-papier ! 📋");
    }).catch(() => {
      setMessage("Erreur lors de la copie du score.");
    });
  };
}

// ==========================================
// 8. DÉMARRAGE ET VÉRIFICATION MINUIT
// ==========================================
setupDailyGame();
setInterval(setupDailyGame, 60000);