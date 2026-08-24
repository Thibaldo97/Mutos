// ==========================================
// 1. CONFIGURATION DU JEU ET CALENDRIER
// ==========================================
const MAX_ATTEMPTS = 6;
const STORAGE_KEY = "sutom_daily_game";
const STREAK_KEY = "sutom_user_streak";
const STATS_KEY = "sutom_user_stats";

const START_DATE = new Date("2026-08-21");

const WORD_CALENDAR = {
  "2026-08-21": "CAMPAGNE",
  "2026-08-22": "CHOCOLAT",
  "2026-08-23": "PARAPLUIE",
  "2026-08-24": "MAISON",
  "2026-08-25": "PLAGE",
  "2026-08-26": "CARAVANE",
  "2026-08-27": "HIBISCUS",
  "2026-08-28": "BRASSARD",
  "2026-08-29": "NAGER",
  "2026-08-30": "AQUARELLE",
  "2026-08-31": "BLUES",
  "2026-09-01": "CAHIER",
  "2026-09-02": "BUREAU",
  "2026-09-03": "STYLO",
  "2026-09-04": "CARTABLE",
  "2026-09-05": "JARDIN",
  "2026-09-06": "SOLEIL",
  "2026-09-07": "RACINE",
  "2026-09-08": "ORANGE",
  "2026-09-09": "COMPOSTER",
  "2026-09-10": "RECOLTE",
  "2026-09-11": "YACHT",
  "2026-09-12": "VALISE",
  "2026-09-13": "LUMIERE",
  "2026-09-14": "FENETRE",
  "2026-09-15": "CHAMBRE",
  "2026-09-16": "CUISINE",
  "2026-09-17": "GATEAU",
  "2026-09-18": "PAIN",
  "2026-09-19": "FROMAGE",
  "2026-09-20": "BEURRE",
  "2026-09-21": "MOINEAU",
  "2026-09-22": "PLATANE",
  "2026-09-23": "FEUILLE",
  "2026-09-24": "RIVIERE",
  "2026-09-25": "POISSON",
  "2026-09-26": "LIONNE",
  "2026-09-27": "ECURIE",
  "2026-09-28": "PELLICULE",
  "2026-09-29": "CHOISIR",
  "2026-09-30": "LABRADOR",
  "2026-10-01": "AUTOMNE",
  "2026-10-02": "NUAGE",
  "2026-10-03": "PLUIE",
  "2026-10-04": "BROUILLARD",
  "2026-10-05": "COULEURS",
  "2026-10-06": "POTAGE",
  "2026-10-07": "LEGUME",
  "2026-10-08": "CAROTTE",
  "2026-10-09": "NAVET",
  "2026-10-10": "CHAMPION",
  "2026-10-11": "BALLON",
  "2026-10-12": "JONGLER",
  "2026-10-13": "TRAPEZE",
  "2026-10-14": "EQUIPE",
  "2026-10-15": "NAVIGUER",
  "2026-10-16": "COURSE",
  "2026-10-17": "MARCHE",
  "2026-10-18": "BARRIERE",
  "2026-10-19": "MUSIQUE",
  "2026-10-20": "ARTISTE",
  "2026-10-21": "BONSAI",
  "2026-10-22": "URBAIN",
  "2026-10-23": "VENTILER",
  "2026-10-24": "PROJECTEUR",
  "2026-10-25": "DANSER",
  "2026-10-26": "COMEDIENNE",
  "2026-10-27": "CINEMA",
  "2026-10-28": "ENFANT",
  "2026-10-29": "SOIGNER",
  "2026-10-30": "POTIRON",
  "2026-10-31": "MASQUE",
  "2026-11-01": "BOUGIE",
  "2026-11-02": "REVUE",
  "2026-11-03": "JOURNAL",
  "2026-11-04": "PAGE",
  "2026-11-05": "LETTRE",
  "2026-11-06": "TIMBRE",
  "2026-11-07": "PEINTURE",
  "2026-11-08": "COLIS",
  "2026-11-09": "CADEAU",
  "2026-11-10": "RUBAN",
  "2026-11-11": "PARDON",
  "2026-11-12": "AMITIE",
  "2026-11-13": "AMOUR",
  "2026-11-14": "SOURIRE",
  "2026-11-15": "REGARD",
  "2026-11-16": "PAROLE",
  "2026-11-17": "SILENCE",
  "2026-11-18": "SECRET",
  "2026-11-19": "TRESOR",
  "2026-11-20": "PAILLETTES",
  "2026-11-21": "BANQUE",
  "2026-11-22": "PIECE",
  "2026-11-23": "BILLET",
  "2026-11-24": "ACHAT",
  "2026-11-25": "VENTE",
  "2026-11-26": "MARCHE",
  "2026-11-27": "CLIENT",
  "2026-11-28": "MAGASIN",
  "2026-11-29": "VITRINE",
  "2026-11-30": "CHEMINEE",
  "2026-12-01": "CALENDRIER",
  "2026-12-02": "FLOCON",
  "2026-12-03": "NEIGE",
  "2026-12-04": "GLACE",
  "2026-12-05": "FROID",
  "2026-12-06": "GANT",
  "2026-12-07": "BONNET",
  "2026-12-08": "ECHARPE",
  "2026-12-09": "MANTEAU",
  "2026-12-10": "BOTTES",
  "2026-12-11": "LOGIS",
  "2026-12-12": "MAISON",
  "2026-12-13": "CHALET",
  "2026-12-14": "CHATEAU",
  "2026-12-15": "SAPIN",
  "2026-12-16": "GUIRLANDE",
  "2026-12-17": "ETOILE",
  "2026-12-18": "BOULE",
  "2026-12-19": "LUTIN",
  "2026-12-20": "TRAINEAU",
  "2026-12-21": "RENNE",
  "2026-12-22": "HOTTE",
  "2026-12-23": "DINDON",
  "2026-12-24": "REVEILLON",
  "2026-12-25": "NOEL",
  "2026-12-26": "FETE",
  "2026-12-27": "JOIE",
  "2026-12-28": "SOUHAIT",
  "2026-12-29": "ANNEE",
  "2026-12-30": "REVEILLON",
  "2026-12-31": "MINUIT"
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
let keyStateMap = {};

// Éléments du DOM
const grid = document.getElementById("grid");
const messageEl = document.getElementById("message");
const dayNumberEl = document.getElementById("day-number");
const shareBtn = document.getElementById("share-btn");
const streakCountEl = document.getElementById("streak-count");
const keyboardEl = document.getElementById("keyboard");

// ==========================================
// 3. GESTION DES STATISTIQUES ET SÉRIE
// ==========================================
function getStats() {
  const saved = localStorage.getItem(STATS_KEY);
  if (!saved) {
    return {
      played: 0,
      wins: 0,
      currentStreak: 0,
      maxStreak: 0,
      guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
    };
  }
  try {
    return JSON.parse(saved);
  } catch (e) {
    return { played: 0, wins: 0, currentStreak: 0, maxStreak: 0, guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 } };
  }
}

function recordGameResult(hasWon, attemptCount) {
  const { dayNumber } = getDayInfo();
  if (localStorage.getItem(`stats_recorded_${dayNumber}`)) return; // Évite d'enregistrer deux fois le même jour

  const stats = getStats();
  stats.played += 1;

  if (hasWon) {
    stats.wins += 1;
    stats.currentStreak += 1;
    if (stats.currentStreak > stats.maxStreak) {
      stats.maxStreak = stats.currentStreak;
    }
    stats.guesses[attemptCount] = (stats.guesses[attemptCount] || 0) + 1;
  } else {
    stats.currentStreak = 0; // Réinitialise la série en cas de défaite
  }

  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  localStorage.setItem(`stats_recorded_${dayNumber}`, "true");
  
  // Synchronise aussi l'ancienne clé STREAK_KEY pour la barre de titre
  localStorage.setItem(STREAK_KEY, JSON.stringify({ count: stats.currentStreak, lastDayPlayed: currentDayIndex }));

  updateStatsDisplay();
}

function updateStatsDisplay() {
  const stats = getStats();

  if (streakCountEl) streakCountEl.textContent = stats.currentStreak;

  const playedEl = document.getElementById("stat-played");
  const winrateEl = document.getElementById("stat-winrate");
  const streakEl = document.getElementById("stat-streak");
  const maxStreakEl = document.getElementById("stat-max-streak");

  if (playedEl) playedEl.textContent = stats.played;
  if (winrateEl) {
    const winRate = stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) : 0;
    winrateEl.textContent = `${winRate}%`;
  }
  if (streakEl) streakEl.textContent = stats.currentStreak;
  if (maxStreakEl) maxStreakEl.textContent = stats.maxStreak;

  // Histogramme
  const distContainer = document.getElementById("guess-distribution");
  if (!distContainer) return;
  distContainer.innerHTML = "";

  const maxVal = Math.max(...Object.values(stats.guesses), 1);

  for (let i = 1; i <= MAX_ATTEMPTS; i++) {
    const count = stats.guesses[i] || 0;
    const percentage = Math.max((count / maxVal) * 100, 7);

    const row = document.createElement("div");
    row.className = "dist-row";
    row.innerHTML = `
      <span>${i}</span>
      <div class="dist-bar-container">
        <div class="dist-bar ${count === 0 ? 'zero' : ''}" style="width: ${count === 0 ? '100%' : percentage + '%'}">
          ${count}
        </div>
      </div>
    `;
    distContainer.appendChild(row);
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
  updateStatsDisplay();

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
// 6. GESTION DES ENTRÉES & DU REPLAY
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

  // Pass 1: Bien placées (Rouge)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      result[i] = "correct";
      targetLetters[i] = null;
    }
  }

  // Pass 2: Mal placées (Jaune)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] !== "correct") {
      const index = targetLetters.indexOf(guessLetters[i]);
      if (index !== -1) {
        result[i] = "present";
        targetLetters[index] = null;
      }
    }
  }

  // Application aux cases et clavier
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

    const currentState = keyStateMap[letter];
    if (status === "correct") {
      keyStateMap[letter] = "correct";
    } else if (status === "present" && currentState !== "correct") {
      keyStateMap[letter] = "present";
    } else if (status === "absent" && !currentState) {
      keyStateMap[letter] = "absent";
    }
  }

  const colorDelay = isRestoring ? 0 : WORD_LENGTH * 200;
  setTimeout(updateKeyboardColors, colorDelay);

  // Historique d'émojis
  const emojiMap = { correct: "🟥", present: "🟨", absent: "🟦" };
  const rowEmojis = result.map(type => emojiMap[type]).join("");
  guessesHistory.push(rowEmojis);

  // ==========================================
  // CONDITIONS DE FIN (VICTOIRE / DÉFAITE)
  // ==========================================
  if (currentGuess === SECRET_WORD) {
    gameOver = true;
    if (!isRestoring) {
      recordGameResult(true, currentAttempt + 1); // Victoire
    }

    setTimeout(() => {
      row.classList.add("win");
      if (!isRestoring) setMessage("Gagné ! 🎉");
      showShareButton();
    }, colorDelay);

  } else if (currentAttempt === MAX_ATTEMPTS - 1) {
    gameOver = true;
    if (!isRestoring) {
      recordGameResult(false, MAX_ATTEMPTS); // Défaite
    }

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
  if (messageEl) messageEl.textContent = msg;
}

// ==========================================
// 7. PARTAGE DE SCORE
// ==========================================
function generateShareText() {
  const { dayNumber } = getDayInfo();
  const stats = getStats();
  const score = (currentGuess === SECRET_WORD) ? guessesHistory.length : "X";
  
  let text = `Mutos n°${dayNumber} ${score}/${MAX_ATTEMPTS} 📅 Série : ${stats.currentStreak} j\n\n`;
  text += guessesHistory.join("\n");
  text += `\n\nJouer : ${window.location.href}`;
  
  return text;
}

function showShareButton() {
  if (!shareBtn) return;
  shareBtn.style.display = "inline-block";
  
  shareBtn.onclick = async () => {
    const textToCopy = generateShareText();
    
    if (navigator.share) {
      try {
        await navigator.share({ text: textToCopy });
      } catch (err) {
        // Annulé par l'utilisateur
      }
    } else if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setMessage("Score copié dans le presse-papier ! 📋");
      }).catch(() => {
        fallbackCopyTextToClipboard(textToCopy);
      });
    } else {
      fallbackCopyTextToClipboard(textToCopy);
    }
  };
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand("copy");
    setMessage("Score copié dans le presse-papier ! 📋");
  } catch (err) {
    setMessage("Erreur lors de la copie du score.");
  }
  document.body.removeChild(textArea);
}

// ==========================================
// 8. INITIALISATION DES MODALES ET DÉMARRAGE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // RÈGLES
  const rulesBtn = document.getElementById("rules-btn");
  const rulesModal = document.getElementById("rules-modal");
  const closeRules = document.getElementById("close-rules");

  if (rulesBtn && rulesModal && closeRules) {
    rulesBtn.addEventListener("click", () => rulesModal.classList.add("active"));
    closeRules.addEventListener("click", () => rulesModal.classList.remove("active"));
    window.addEventListener("click", (e) => {
      if (e.target === rulesModal) rulesModal.classList.remove("active");
    });
  }

  // STATISTIQUES
  const statsBtn = document.getElementById("stats-btn");
  const statsModal = document.getElementById("stats-modal");
  closeStats = document.getElementById("close-stats");

  if (statsBtn && statsModal && closeStats) {
    statsBtn.addEventListener("click", () => {
      updateStatsDisplay();
      statsModal.classList.add("active");
    });

    closeStats.addEventListener("click", () => statsModal.classList.remove("active"));
    window.addEventListener("click", (e) => {
      if (e.target === statsModal) statsModal.classList.remove("active");
    });
  }
});

// Lancement du jeu
setupDailyGame();
setInterval(setupDailyGame, 60000);
