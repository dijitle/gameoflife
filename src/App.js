import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import LifeGrid from "./components/LifeGrid";

function App() {
  const minZoom = 8;
  const maxZoom = 256;

  const [zoom, setZoom] = useState(minZoom);
  const [isPlaying, setIsPlaying] = useState(null);

  let emptyGrid = [];
  let gridSize = 512;

  let row = [];
  for (let j = 0; j < gridSize; j++) {
    row.push(false);
  }
  for (let i = 0; i < gridSize; i++) {
    emptyGrid.push([...row]);
  }

  const [gameGrid, setGameGrid] = useState(emptyGrid);

  const toggleLife = (row, col) => {
    let newGrid = [...gameGrid];

    newGrid[row][col] = gameGrid[row][col] ? false : true;

    setGameGrid(newGrid);
  };

  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextGeneration = (prev) => {
    let newGrid = prev.map((arr) => {
      return arr.slice();
    });

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
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
          newGrid[row][col] = true;
        } else if (livingNeighbors < 2 || livingNeighbors > 3) {
          newGrid[row][col] = false;
        }
      }
    }

    return newGrid;
  };

  const zoomIn = () => {
    setZoom(zoom / 2);
  };

  const zoomOut = () => {
    setZoom(zoom * 2);
  };

  useEffect(() => {
    if (isPlaying) {
      let id = setInterval(
        () => setGameGrid((prev) => nextGeneration(prev)),
        100
      );
      return () => clearInterval(id);
    }
  }, [isPlaying]);

  return (
    <div className="App">
      <Header
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        next={() => setGameGrid((prev) => nextGeneration(prev))}
        isPlaying={isPlaying}
        playPause={playPause}
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
