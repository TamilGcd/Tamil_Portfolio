'use strict';



/**
 * add event on multiple elements
 */

const addEventOnElements = function (elem, type, callback) {
  for (let i = 0, len = elem.length; i < len; i++) {
    elem[i].addEventListener(type, callback);
  }
}



/**
 * LOADING
 */

const loadingElement = document.querySelector("[data-loading-container]");

window.addEventListener("load", function () {
  loadingElement.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * MOBILE NAVBAR TOGGLE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElements(navbarLinks, "click", closeNavbar);



/**
 * HEADER
 */

// header will be active after scroll 200px of window

const header = document.querySelector("[data-header]");

const headerActive = function () {
  window.scrollY > 200 ? header.classList.add("active")
    : header.classList.remove("active");
}

window.addEventListener("scroll", headerActive);



/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  const windowHeight = window.innerHeight;
  
  for (let i = 0, len = revealElements.length; i < len; i++) {
    if (revealElements[i].getBoundingClientRect().top < windowHeight / 1.2) {
      revealElements[i].classList.add("revealed");
    }
  }
}

const smoothScrollTo = function (target) {
  window.scrollTo({
    top: target.offsetTop,
    behavior: 'smooth'
  });
}

window.addEventListener("scroll", scrollReveal);
window.addEventListener("load", scrollReveal);

// Smooth scroll when clicking on a link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        smoothScrollTo(target);
    });
});


/*on click navigate*/
function scrollToSection(sectionId) {
  var section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: 'smooth' });
}
/* tic tac toe*/
let currentPlayer = 'X';
const gameState = Array(9).fill(null);
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function cellClicked(index) {
  if (gameState[index] || checkWinner()) return;
  gameState[index] = currentPlayer;
  render();
  if (checkWinner()) {
    if (currentPlayer === 'X') {
      document.getElementById('winSound').play();
    } else {
      document.getElementById('loseSound').play();
    }
    return;
  }
  if (gameState.every(cell => cell)) {
    document.getElementById('drawSound').play();
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (currentPlayer === 'O') {
    setTimeout(makeComputerMove, 500); // Delay for 0.5 seconds before computer move
  }
}

function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function render() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.textContent = gameState[index] || '';
  });
}

function makeComputerMove() {
  // Basic AI: Prioritize winning moves or block user's winning moves
  let bestMove = null;
  // Check for winning moves
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (gameState[a] === 'O' && gameState[b] === 'O' && !gameState[c]) {
      bestMove = c;
      break;
    } else if (gameState[a] === 'O' && gameState[c] === 'O' && !gameState[b]) {
      bestMove = b;
      break;
    } else if (gameState[b] === 'O' && gameState[c] === 'O' && !gameState[a]) {
      bestMove = a;
      break;
    }
  }
  // If no winning moves, try to block user's winning moves
  if (!bestMove) {
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (gameState[a] === 'X' && gameState[b] === 'X' && !gameState[c]) {
        bestMove = c;
        break;
      } else if (gameState[a] === 'X' && gameState[c] === 'X' && !gameState[b]) {
        bestMove = b;
        break;
      } else if (gameState[b] === 'X' && gameState[c] === 'X' && !gameState[a]) {
        bestMove = a;
        break;
      }
    }
  }
  // If no winning or blocking moves, make a random move
  if (!bestMove) {
    let emptyCells = [];
    for (let i = 0; i < gameState.length; i++) {
      if (!gameState[i]) {
        emptyCells.push(i);
      }
    }
    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      bestMove = emptyCells[randomIndex];
    }
  }
  cellClicked(bestMove);
}
function reset(){
  currentPlayer='X';
  gameState.fill(null);
  render();
}
// resume download


