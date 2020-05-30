import React, { useRef, useState, useEffect } from "react";
import "./LifeGrid.css";
import useRefSize from "../hooks/useRefSize";

function LifeGrid(props) {
  const grid = useRef(null);
  const gridSize = useRefSize(grid);

  const canvas = useRef(null);
  const [tileSize, setTileSize] = useState(0);

  const draw = () => {
    const ctx = canvas.current.getContext("2d");
    let w = gridSize.width;
    let h = gridSize.height;
    let z = props.zoomLevel;

    let s = Math.min(w, h) / z;

    ctx.clearRect(0, 0, w, h);

    if (z <= 64) {
      for (let i = 1; i < z * (Math.max(w, h) / Math.min(w, h)); i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * s);
        ctx.lineTo(w, i * s);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i * s, 0);
        ctx.lineTo(i * s, h);
        ctx.stroke();
      }
    }

    for (let row = 0; row < z; row++) {
      for (let col = 0; col < z; col++) {
        if (props.gameGrid[row][col]) {
          ctx.beginPath();
          ctx.arc(s * col + s / 2, s * row + s / 2, s / 3, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }
  };

  useEffect(() => {
    setTileSize(
      Math.min(Math.min(gridSize.height, gridSize.width) / props.zoomLevel),
      1
    );

    let id = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(id);
  }, [gridSize, props.zoomLevel, props.gameGrid]);

  return (
    <div ref={grid} className="grid">
      <canvas
        ref={canvas}
        width={gridSize.width}
        height={gridSize.height}
        onClick={(e) => {
          let rect = e.target.getBoundingClientRect();

          let x = Math.floor(
            (e.clientX - rect.left) /
              (Math.min(gridSize.height, gridSize.width) / props.zoomLevel)
          );
          let y = Math.floor(
            (e.clientY - rect.top) /
              (Math.min(gridSize.height, gridSize.width) / props.zoomLevel)
          );

          props.toggleLife(y, x);
        }}
      ></canvas>
    </div>
  );
}

export default LifeGrid;
