document.addEventListener('DOMContentLoaded', () => {
  const qwerty = document.querySelector('#qwerty');
  const phrase = document.querySelector('#phrase');
  const startGameBtn = document.querySelector('.btn__reset');
  let missed = 0;

  const phrases = [
    'Hot on the heels',
    'A bird in the hand is worth two in the bush',
    'The darkest hour is just before the dawn',
    'Let sleeping dogs lie',
    'The best defence is a good offence'
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
      if (!char === '') {
        listItem.className = 'letter';
      }
      listItem.textContent = char;
      phrase.firstElementChild.appendChild(listItem);
    }
  }

  function checkLetter(button) {
    const phraseLetters = phrase.children();
    let matchIsFound = false;

    for (const li of phraseLetters) {
      if (li.textContent === button) {
        li.className += ' show';
        matchIsFound = true;
      }
    }
    if (!matchIsFound) {
      return null;
    }
  }

  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);

  startGameBtn.addEventListener('click', () => {
    const overlay = document.querySelector('#overlay');
    overlay.style.display = 'none';
  });
});