export const config = {
  cellsCounter: 9,
  cellEdge: 35,
};

export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

// TODO: better naming
export const difficultyMap = {
  [Difficulty.Easy]: 3,
  [Difficulty.Medium]: 5,
  [Difficulty.Hard]: 7,
};
