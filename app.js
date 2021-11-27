document.addEventListener('DOMContentLoaded', () => {
  const qwerty = document.querySelector('#qwerty');
  const phrase = document.querySelector('#phrase');
  const startGameBtn = document.querySelector('.btn__reset');
  let missed = 0;

  const phrases = [
    'hot on the heels',
    'a bird in the hand is worth two in the bush',
    'the darkest hour is just before the dawn',
    'let sleeping dogs lie',
    'the best defence is a good offence'
  ];

  function getRandomPhraseAsArray(arr) {
    const index = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[index];
    const arrayOfPhraseCharacters = randomPhrase.split('');
    return arrayOfPhraseCharacters;
  }

  function addPhraseToDisplay(arr) {
    for (const char of arr) {
      const listItem = document.createElement('li');
      if (char === ' ') {
        listItem.className = 'space';
      } else {
        listItem.className = 'letter';
      }
      listItem.textContent = char;
      phrase.firstElementChild.appendChild(listItem);
    }
  }

  function checkLetter(button) {
    const phraseLetters = phrase.firstElementChild.children;
    let matchIsFound = false;

    for (const li of phraseLetters) {
      if (li.textContent === button.textContent) {
        li.className += ' show';
        matchIsFound = true;
      }
    }

    if (matchIsFound) {
      return button.textContent;
    } else {
      return null;
    }
  }

  qwerty.addEventListener('click', (e) => {
    const scoreboardSection = document.querySelector('#scoreboard');
    const hearts = scoreboardSection.firstElementChild.children;

    if (e.target.tagName === 'BUTTON') {
      e.target.className = 'chosen';
      const letterFound = checkLetter(e.target);
      if (letterFound === null) {
        hearts[missed].firstElementChild.setAttribute('src', 'images/lostHeart.png');
        missed++;
      }
    }
    checkWin();
  });

  function checkWin() {
    const phraseLetters = document.querySelectorAll('.letter');
    const correctLetters = document.querySelectorAll('.show');
    const overlay = document.querySelector('#overlay');

    if (phraseLetters.length === correctLetters.length) {
      overlay.className = 'win';
      overlay.firstElementChild.textContent = 'You Win!';
      overlay.style.display = '';
      overlay.lastElementChild.style.display = 'none';
    } else if (missed >= 5) {
      overlay.className = 'lose';
      overlay.firstElementChild.textContent = 'You Lose!';
      overlay.style.display = '';
      overlay.lastElementChild.style.display = 'none';
    }
  }

  startGameBtn.addEventListener('click', () => {
    const overlay = document.querySelector('#overlay');
    const phraseArray = getRandomPhraseAsArray(phrases);

    addPhraseToDisplay(phraseArray);
    overlay.style.display = 'none';
  });
});