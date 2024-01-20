import { randomInt, clamp } from './utils';

const MIN_CHAR = 3;

export default function createPuzzle({
  wordlist = [],
  width = 11,
  height = 11,
  minWordLength = MIN_CHAR,
  listSize,
  margin = 0,
  shareLetters = true,
  allowReverseWords = true,
  reverseWordRatio = 0.33,
}) {
  // Argument validation
  const minSize = Math.max(MIN_CHAR, minWordLength);
  height = Math.max(height, minSize);
  width = Math.max(width, minSize);
  const maxSize = Math.max(MIN_CHAR, width, height);
  minWordLength = clamp(minWordLength, MIN_CHAR, maxSize);
  margin = clamp(margin, 0, maxSize - minWordLength);
  const maxWordLength = clamp(Math.max(width, height) - margin, minWordLength, maxSize);
  reverseWordRatio = clamp(reverseWordRatio * 100, 0, 100) / 100;

  // create word list
  const _wordlist = createAValidWordList(
    wordlist,
    listSize,
    minWordLength,
    maxWordLength,
    width * height
  );
  // create empty grid matrix
  const grid = createEmptyGridArray(height, width);
  // place words
  placeWords(grid, _wordlist, wordlist, {
    height,
    width,
    shareLetters,
    allowReverseWords,
    reverseWordRatio,
  });
  // fill empty cells with random letters
  fillEmptyCells(grid);

  return {
    grid,
    wordlist: _wordlist.filter((w) => w),
    margin,
    width,
    height,
    listSize,
    minWordLength,
    maxWordLength,
    allowReverseWords,
    reverseWordRatio,
    shareLetters,
    unplacedWords: wordlist,
  };
}

function createAValidWordList(wordlist, listSize, minWordLength, maxWordLength, area) {
  const filteredWordlist = wordlist
    .concat([])
    .filter((w, i) => w.length <= maxWordLength && w.length >= minWordLength);

  const result = [];
  const length = Math.min(filteredWordlist.length, listSize) || filteredWordlist.length;

  if (!length) return result;

  for (let i = 0; i < length; i++) {
    // pick random words
    const index = randomInt(filteredWordlist.length);
    const word = filteredWordlist[index];
    // check for overflow
    area -= word.length;
    if (area <= 0) break;

    result.push(word);
    // avoid duplication
    filteredWordlist.splice(index, 1);
  }

  return result.map((word, i) => {
    return { value: word, found: false, index: i };
  });
}

function createEmptyGridArray(height, width) {
  const grid = new Array(height).fill(0).map(() => {
    return new Array(width).fill(0);
  });

  return grid;
}

function placeWords(
  grid,
  wordlist,
  originalWordlist,
  { height, width, shareLetters, allowReverseWords, reverseWordRatio }
) {
  const directions = [
    { x: 0, y: 1, check: (len, _, y) => y <= width - len }, // horizontal
    { x: 1, y: 0, check: (len, x, _) => x <= height - len }, // vertical
    { x: -1, y: 1, check: (len, x, y) => x >= len && y <= width - len }, // diagonal
    { x: 1, y: 1, check: (len, x, y) => x <= height - len && y <= width - len }, // diagonal down
  ];

  // Sort wordlist from maximum word length to minimum
  const sortedWordlist = [...wordlist].sort((a, b) => b.value.length - a.value.length);
  const closedSet = {};

  for (let i = 0; i < sortedWordlist.length; i++) {
    const word = sortedWordlist[i].value;
    let cell, dir;
    let empty = true;
    const openSet = getOpenSet(height, width, word.length, closedSet);

    do {
      if (openSet.length <= 0) {
        wordlist[sortedWordlist[i].index] = 0;
        empty = false;
        break;
      }

      const cellIndex = randomInt(openSet.length);
      cell = openSet[cellIndex];

      const dirIndex = getDirIndex(cell, height, width);

      for (let j = 0; j < directions.length; j++) {
        const index = (j + dirIndex) % directions.length;
        dir = directions[index];
        empty = isEmpty(grid, word, dir, cell.x, cell.y, shareLetters);
        if (!empty) {
          continue;
        } else break;
      }

      if (!empty) {
        openSet.splice(cellIndex, 1);
      }
    } while (!empty);

    if (empty) {
      const reverse = allowReverseWords && Math.random() < reverseWordRatio;
      placeWord(grid, closedSet, { start: cell, word: word.toUpperCase(), dir, reverse });
      const start = reverse
        ? [getEndPoint(cell.x, dir.x, word.length), getEndPoint(cell.y, dir.y, word.length)]
        : [cell.x, cell.y];
      const end = reverse
        ? [cell.x, cell.y]
        : [getEndPoint(cell.x, dir.x, word.length), getEndPoint(cell.y, dir.y, word.length)];
      wordlist[sortedWordlist[i].index].start = start;
      wordlist[sortedWordlist[i].index].end = end;
      wordlist[sortedWordlist[i].index].reverse = reverse;
      // remove from original wordlist
      const originalIndex = originalWordlist.indexOf(word);
      originalWordlist.splice(originalIndex, 1);
    }
  }
}

function getDirIndex(cell, h, w) {
  if (cell.x === 0 || cell.x === h) {
    return 0;
  } else if (cell.y === 0 || cell.y === w) {
    return 1;
  }
  return randomInt(2, 4);
}

function placeWord(grid, closedSet, { start, word, dir, reverse }) {
  let x = reverse ? getEndPoint(start.x, dir.x, word.length) : start.x;
  let y = reverse ? getEndPoint(start.y, dir.y, word.length) : start.y;
  const factor = reverse ? -1 : 1;

  for (const char of word) {
    grid[x][y] = char;
    closedSet[x + ',' + y] = 1;
    x += dir.x * factor;
    y += dir.y * factor;
  }
}

function getEndPoint(start, dir, len) {
  return start + (len - 1) * dir;
}

function isEmpty(grid, word, dir, x, y, shareLetters) {
  let empty = true,
    shared = false;
  if (!dir.check(word.length, x, y)) return false;
  for (const char of word) {
    const sameChar = char.toUpperCase() === ('' + grid[x][y]).toUpperCase();
    empty = grid[x][y] === 0 || (shareLetters && !shared && sameChar);
    shared = sameChar;
    if (!empty) break;
    x += dir.x;
    y += dir.y;
  }
  return empty;
}

function getOpenSet(h, w, l, closedSet) {
  const openset = [];
  const maxX = h - l;
  const maxY = w - l;
  for (let i = 0; i < h * w; i++) {
    const x = Math.floor(i / w);
    const y = Math.floor(i % h);
    if (x > maxX && y > maxY) continue;
    if (closedSet[x + ',' + y]) continue;
    openset.push({ x, y });
  }
  return openset;
}

function fillEmptyCells(grid) {
  grid.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (!cell) grid[x][y] = String.fromCharCode(randomInt(65, 91));
    });
  });
}
