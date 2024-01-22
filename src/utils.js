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
