import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import LifeGrid from "./components/LifeGrid";

function App() {
  const minZoom = 8;
  const maxZoom = 256;

  const [zoom, setZoom] = useState(minZoom);

  let emptyGrid = [];

  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let j = 0; j < 8; j++) {
      row.push(0);
    }
    emptyGrid.push(row);
  }

  const [gameGrid, setGameGrid] = useState(emptyGrid);

  const toggleLife = (row, col) => {
    let newGrid = gameGrid.map((arr) => arr.slice());

    newGrid[row][col] = gameGrid[row][col] === 0 ? 1 : 0;

    setGameGrid(newGrid);
  };

  const nextGeneration = () => {
    let prev = gameGrid;
    let newGrid = prev.map((arr) => {
      return arr.slice();
    });

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        let livingNeighbors =
          ((prev[row - 1] || 0)[col - 1] || 0) +
          ((prev[row - 1] || 0)[col] || 0) +
          ((prev[row - 1] || 0)[col + 1] || 0) +
          (prev[row][col - 1] || 0) +
          (prev[row][col + 1] || 0) +
          ((prev[row + 1] || 0)[col - 1] || 0) +
          ((prev[row + 1] || 0)[col] || 0) +
          ((prev[row + 1] || 0)[col + 1] || 0);

        if (livingNeighbors === 3) {
          newGrid[row][col] = 1;
        } else if (livingNeighbors < 2 || livingNeighbors > 3) {
          newGrid[row][col] = 0;
        }
      }
    }

    setGameGrid(newGrid);
  };

  const zoomIn = () => {
    setZoom(zoom / 2);
  };

  const zoomOut = () => {
    setZoom(zoom * 2);
  };

  return (
    <div className="App">
      <Header
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        next={nextGeneration}
        canZoomIn={zoom > minZoom}
        canZoomOut={zoom < maxZoom}
      ></Header>
      <LifeGrid
        zoomLevel={zoom}
        gameGrid={gameGrid}
        toggleLife={toggleLife}
      ></LifeGrid>
    </div>
  );
}

export default App;
