import { useState, useEffect, useCallback } from "react";
import * as R from "ramda";

import { config, Difficulty, difficultyMap } from "core/config";
import { getRandomNumberInRange } from "utils/helpers";

export type Board = number[][];

// in case of to-deep recursion? exit? how?
export function solve(board: Board) {
  const { cellsCounter } = config;

  console.log("solve");

  // console.log("deep", deep);

  const emptyCell = findEmptyCell(board);

  if (!emptyCell) {
    return board;
  }

  const { y, x } = emptyCell;

  for (let val = 1; val <= cellsCounter; val++) {
    if (canSetVal(board, val, y, x)) {
      board[y][x] = val;

      if (solve(board)) {
        return board;
      }

      board[y][x] = 0;
    }
  }

  return false;
}

function findEmptyCell(board: Board) {
  const { cellsCounter } = config;

  for (let y = 0; y < cellsCounter; y++) {
    for (let x = 0; x < cellsCounter; x++) {
      if (board[y][x] === 0) {
        return { y, x };
      }
    }
  }

  return false;
}

function canSetVal(board: Board, val: number, y: number, x: number): boolean {
  const { cellsCounter } = config;

  for (let i = 0; i < cellsCounter; i++) {
    if (board[y][i] === val || board[i][x] === val) {
      return false;
    }
  }

  let y0 = Math.floor(y / 3) * 3;
  let x0 = Math.floor(x / 3) * 3;

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (board[y0 + y][x0 + x] === val) {
        return false;
      }
    }
  }

  return true;
}

function applyDifficulty(board: Board, difficulty: Difficulty): Board {
  const { cellsCounter } = config;
  const cellsToErase = difficultyMap[difficulty];

  // erase N cells at each sub-square depending on difficulty
  for (let y0 = 0; y0 < cellsCounter; y0 += 3) {
    for (let x0 = 0; x0 < cellsCounter; x0 += 3) {
      let toEraseLeft = getRandomNumberInRange(
        cellsToErase - 1,
        cellsToErase + 2
      );

      let squareCells = [];

      for (let y = y0; y < y0 + 3; y++) {
        for (let x = x0; x < x0 + 3; x++) {
          squareCells.push([y, x]);
        }
      }

      while (toEraseLeft > 0) {
        let randomIndex = getRandomNumberInRange(0, squareCells.length - 1);

        let [y, x] = squareCells[randomIndex];
        board[y][x] = 0;
        squareCells.splice(randomIndex, 1);

        toEraseLeft--;
      }
    }
  }

  return board;
}

// export function useBoardGenerator(difficulty: Difficulty = Difficulty.Medium) {
//   const [isGenerating, setIsGenerating] = useState(false);

//   const generate = useCallback(() => {
//     const { cellsCounter } = config;

//     const emptyBoard: Board = new Array(cellsCounter)
//       .fill(0)
//       .reduce((res, _) => {
//         return [...res, new Array(cellsCounter).fill(0)];
//       }, []);

//     const initialBoard = emptyBoard.reduce((board, _, y) => {
//       const x = getRandomNumberInRange(1, 9);
//       const val = getRandomNumberInRange(1, 9);

//       if (canSetVal(board, val, y, x)) {
//         board[y][x] = val;
//       }

//       return board;
//     }, emptyBoard);

//     const solvedBoard = solve(initialBoard) as Board;
//     return applyDifficulty(solvedBoard, difficulty);
//   }, [difficulty]);

//   useEffect(() => {
//     setIsGenerating(true);
//     const board = generate();
//     setIsGenerating(false);
//   }, [generate]);

//   return { generate, isGenerating };
// }

export function generateBoard(
  difficulty: Difficulty = Difficulty.Medium
): Board {
  const { cellsCounter } = config;

  const emptyBoard: Board = new Array(cellsCounter).fill(0).reduce((res, _) => {
    return [...res, new Array(cellsCounter).fill(0)];
  }, []);

  const initialBoard = emptyBoard.reduce((board, _, y) => {
    const x = getRandomNumberInRange(1, 9);
    const val = getRandomNumberInRange(1, 9);

    if (canSetVal(board, val, y, x)) {
      board[y][x] = val;
    }

    return board;
  }, emptyBoard);

  const solvedBoard = solve(initialBoard) as Board;

  return applyDifficulty(solvedBoard, difficulty);
}

// function validateSet(set: number[]): boolean {
//   const withoutZeros = set.filter(Boolean);
//   return new Set(withoutZeros).size === withoutZeros.length;
// }

// const validateBoard = (board: $fixme) => {
//   const { cellsCounter } = config;

//   // rows and cols
//   for (let y = 0; y < cellsCounter; y++) {
//     let row = [];
//     let col = [];

//     for (let x = 0; x < cellsCounter; x++) {
//       row.push(board[y][x]);
//       col.push(board[x][y]);
//     }

//     if (!validateSet(row) || !validateSet(col)) {
//       return false;
//     }
//   }

//   // squares
//   for (let y0 = 0; y0 < cellsCounter; y0 += 3) {
//     for (let x0 = 0; x0 < cellsCounter; x0 += 3) {
//       let square = [];

//       for (let y = y0; y < y0 + 3; y++) {
//         for (let x = x0; x < x0 + 3; x++) {
//           square.push(board[y][x]);
//         }
//       }

//       if (!validateSet(square)) {
//         return false;
//       }
//     }
//   }

//   return true;
// };
