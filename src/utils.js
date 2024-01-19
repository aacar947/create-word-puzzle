export function randomInt(number = 1) {
  let min = 0,
    max = number;
  if (arguments.length >= 2) {
    min = arguments[0];
    max = arguments[1];
  }
  return Math.floor(Math.random() * (max - min) + min);
}

export function clamp(number = 0, min = 0, max = Infinity) {
  return Math.max(Math.min(number, max), min);
}

export function calculateScore(startTime, wordlist) {
  return wordlist.reduce((score, word) => {
    if (!word.found) return score;
    const relativeTime = Math.max(Math.floor((word.foundAt - startTime) / 1000), 1);
    //const calc = Math.floor((word.value.length * 250) / Math.log10(relativeTime * 10));
    const calc = Math.floor(1000 / (Math.sqrt(relativeTime) / 27 + 1));

    return score + calc;
  }, 0);
}
