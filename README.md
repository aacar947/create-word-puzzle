# Create Word Puzzle

Generate customizable word search puzzles of any size with this versatile npm package. Because, let's face it, what developer doesn't dream of creating puzzles instead of solving coding challenges? Or, let me do better— who doesn't need puzzles in their lives? Well, that's where Create Word Puzzle comes in. Have fun with this needfull tool.

## Table of Contents

1. [Examples](#examples)
1. [Installation](#installation)
1. [Usage](#usage)
1. [Options](#options)
1. [Contributing](#contributing)
1. [License](#license)

## Examples

- [🚀 Demo](https://aacar947.github.io/demo-create-word-puzzle.io/)
- [🚀 Example Project](https://github.com/aacar947/word-search-puzzle)

## Installation

You can install the library using npm:

```shell
npm i create-word-puzzle
```

## Usage

1. Import the package into your project:

```js
import createWordPuzzle from 'create-word-puzzle';
```

- in Node.js:

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

| Name              | Type    |  Default  | Description                                                                                                                                                                                                                |
| :---------------- | :------ | :-------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wordlist          | array   |    []     | List of words to include in the word search puzzle. This array will be modified and returned in the unplacedWords property.                                                                                                |
| width             | number  |    11     | Width of the word search puzzle grid.                                                                                                                                                                                      |
| height            | number  |    11     | Height of the word search puzzle grid.                                                                                                                                                                                     |
| minWordLength     | number  |     3     | Minimum length of words to be included in the puzzle.                                                                                                                                                                      |
| listSize          | number  | undefined | The listSize parameter specifies the number of words to be included in the puzzle. In some cases, the algorithm may not be able to fit all the provided words due to constraints such as grid dimensions and word lengths. |
| margin            | number  |     0     | Specify the margin between the maximum word length and the maximum grid dimension in the puzzle grid. Additionally, you can set the maximum word length by providing a margin value.                                       |
| shareLetters      | boolean |   true    | Whether words in the puzzle can share letters.                                                                                                                                                                             |
| allowReverseWords | boolean |   true    | Whether to allow words to appear in reverse order.                                                                                                                                                                         |
| reverseWordRatio  | number  |   0.33    | Ratio of words that can appear in reverse order in grid.                                                                                                                                                                   |

## Contributing

Contributions are welcome! If you have ideas for new features, improvements, or bug fixes, please submit a pull request or open an issue.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the LICENSE file for details.
