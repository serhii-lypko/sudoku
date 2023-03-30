import { useState, useEffect } from "react";

import { Board, generateBoard, solve } from "./core";
import { config } from "./core/config";

import "./App.css";

type $fixme = any;

function App() {
  const [state, setState] = useState<Board | null>(null);
  // const [counter, setCounter] = useState(0);

  // const { generate, isGenerating } = useBoardGenerator();

  // console.log("isGenerating: ", isGenerating);

  useEffect(() => {
    if (!state) {
      // console.log("will");
      // const board = generate();
      // setState(board as any);
    }
  }, [state]);

  const drawBoard = () => {
    const { cellsCounter, cellEdge } = config;
    const boardEdgeWidth = cellsCounter * cellEdge;

    return (
      <div
        style={{
          position: "relative",
          width: boardEdgeWidth,
          height: boardEdgeWidth,
          border: "3px solid black",
        }}
      >
        {state &&
          state.map((row, y) => {
            return row.map((cell, x) => {
              const id = `${y}-${x}`;

              const isLastRow = y === cellsCounter - 1;
              const isLastColumn = x === cellsCounter - 1;

              const yEdgeHasBorder = (x + 1) % 3 === 0 && !isLastColumn;
              const xEdgeHasBorder = (y + 1) % 3 === 0 && !isLastRow;

              return (
                <div
                  id={id}
                  key={id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: y * cellEdge,
                    left: x * cellEdge,
                    width: cellEdge,
                    height: cellEdge,
                    borderBottom: !isLastRow ? "1px solid black" : "none",
                    borderRight: !isLastColumn ? "1px solid black" : "none",
                    borderRightWidth: yEdgeHasBorder ? 3 : 1,
                    borderBottomWidth: xEdgeHasBorder ? 3 : 1,
                  }}
                  onClick={(e: $fixme) => {
                    const [y, x] = e.target.id.split("-").map(Number);

                    // console.log("isValidMove: ", isValidMove);
                  }}
                >
                  {cell ? cell : ""}
                </div>
              );
            });
          })}
      </div>
    );
  };

  return (
    <div style={{ padding: 50 }}>
      <main>{state && drawBoard()}</main>

      {/* {counter} */}

      <button
        style={{ marginTop: 25, padding: 10 }}
        onClick={() => {
          if (state) {
            const solved = solve(state);

            if (solved) {
              console.log(solved);

              setState(solved);
            }

            // console.log("solved", solved);
          }

          // setCounter(Math.random() * 100);
        }}
      >
        Solve
      </button>

      <button
        onClick={() => {
          const board = generateBoard();
          setState(board as any);
        }}
      >
        Re generate
      </button>
    </div>
  );
}

export default App;
