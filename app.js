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
    const key = e.target;

    if (key.tagName === 'BUTTON') {
      key.className = 'chosen';
      key.setAttribute('disabled', '');
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
    const p = document.createElement('p');

    if (phraseLetters.length === correctLetters.length) {
      overlay.className = 'win';
      overlay.style.display = '';
      p.textContent = 'You Win!';
      overlay.appendChild(p);
      startGameBtn.textContent = 'Play Again';
    } else if (missed >= 5) {
      overlay.className = 'lose';
      overlay.style.display = '';
      p.textContent = 'You Lose!';
      overlay.appendChild(p);
      startGameBtn.textContent = 'Try Again';
    }
  }

  startGameBtn.addEventListener('click', () => {
    const overlay = document.querySelector('#overlay');
    const p = overlay.lastElementChild;
    const ul = document.querySelector('ul');
    const phraseArray = getRandomPhraseAsArray(phrases);

    ul.innerHTML = '';
    addPhraseToDisplay(phraseArray);
    overlay.style.display = 'none';

    if (overlay.className === 'start') {
      overlay.style.display = 'none';
    } else {
      const chosenLetterList = document.querySelectorAll('.chosen');
      const lostHeartList = document.querySelectorAll('[src="images/lostHeart.png"]');

      missed = 0;
      overlay.style.display = 'none';
      overlay.removeChild(p);

      for (const button of chosenLetterList) {
        button.className = '';
      }

      for (const heart of lostHeartList) {
        heart.setAttribute('src', 'images/liveHeart.png')
      }
    }
  });
});