# Create Word Puzzle

Generate customizable word search puzzles of any size with this versatile npm package.

## Table of Contents

1. [Installation](#installation)
1. [Usage](#usage)
1. [Options](#options)
1. [Contributing](#contributing)
1. [License](#license)

## Installation

You can install the library using npm:

```shell
npm install create-word-puzzle
```

## Usage

1. Import the package into your project:

```js
import createWordPuzzle from 'create-word-puzzle';
```

in Node.js:

```js
const createWordPuzzle = require('create-word-puzzle');
```

2. Generate a word puzzle by providing a list of words and defining the grid width and height as an object. This function accepts an options object as an argument and returns an object as a result:

```js
const words = ['apple', 'banana', 'cherry'];
const puzzle = createWordPuzzle({ wordlist: words, width: 8, height: 8 });
```

You can access the output grid array from the grid property of puzzle object.

Example grid array output:

```js
[
  ['X', 'B', 'A', 'N', 'A', 'N', 'A', 'A'],
  ['Q', 'W', 'J', 'H', 'M', 'Q', 'X', 'P'],
  ['L', 'W', 'O', 'C', 'S', 'Y', 'W', 'P'],
  ['D', 'Q', 'A', 'H', 'N', 'B', 'U', 'L'],
  ['P', 'U', 'A', 'E', 'U', 'G', 'Y', 'E'],
  ['Y', 'R', 'J', 'R', 'Y', 'I', 'C', 'J'],
  ['L', 'F', 'S', 'R', 'V', 'D', 'Y', 'U'],
  ['L', 'L', 'K', 'Y', 'V', 'Q', 'R', 'N'],
];
```

3. You can customize the puzzle generation by providing additional options:

```js
const puzzle = createWordPuzzle({
  wordlist: words,
  width: 8,
  height: 8,
  minWordLength: 4,
  listSize: 8,
  margin: 0,
  shareLetters: true,
  allowReverseWords: true,
  reverseWordRatio: 0.33,
});
```

## Options

Here are all the options you can provide to customize the puzzle:

| Name              | Type    |  Default  | Description                                                                               |
| :---------------- | :------ | :-------: | :---------------------------------------------------------------------------------------- |
| wordlist          | array   |    []     | List of words to include in the word search puzzle.                                       |
| width             | number  |    11     | Width of the word search puzzle grid.                                                     |
| height            | number  |    11     | Height of the word search puzzle grid.                                                    |
| minWordLength     | number  |     3     | Minimum length of words to be included in the puzzle.                                     |
| listSize          | number  | undefined | Number of words to be included in the puzzle.                                             |
| margin            | number  |     0     | Margin between the maximum word length and the maximum grid dimension in the puzzle grid. |
| shareLetters      | boolean |   true    | Whether words in the puzzle can share letters.                                            |
| allowReverseWords | boolean |   true    | Whether to allow words to appear in reverse order.                                        |
| reverseWordRatio  | number  |   0.33    | Ratio of words that can appear in reverse order in grid.                                  |

## Contributing

Contributions are welcome! If you have ideas for new features, improvements, or bug fixes, please submit a pull request or open an issue.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
