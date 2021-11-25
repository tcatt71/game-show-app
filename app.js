document.addEventListener('DOMContentLoaded', () => {
  const qwerty = document.querySelector('#qwerty');
  const phrase = document.querySelector('#phrase');
  const gameStartBtn = document.querySelector('.btn__reset');
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

  gameStartBtn.addEventListener('click', () => {
    const overlay = document.querySelector('#overlay');
    overlay.style.display = 'none';
  });
});