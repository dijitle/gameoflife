import React, { useRef, useState, useEffect } from "react";
import "./LifeGrid.css";
import useRefSize from "../hooks/useRefSize";

function LifeGrid(props) {
  const grid = useRef(null);
  const gridSize = useRefSize(grid);
  const canvas = useRef(null);

  const [isClicked, setIsClicked] = useState(false);

  const draw = () => {
    const ctx = canvas.current.getContext("2d", { alpha: false });
    let w = gridSize.width;
    let h = gridSize.height;
    let z = props.zoomLevel;

    let s = Math.min(w, h) / z;

    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "#424242";
    ctx.setLineDash([s / 10, s / 5]);

    if (z <= 128) {
      for (let i = 1; i < 512; i++) {
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

    ctx.fillStyle = "#848484";
    for (let row = 0; row < 512; row++) {
      for (let col = 0; col < 512; col++) {
        if (props.gameGrid[row][col]) {
          ctx.beginPath();
          ctx.arc(s * col + s / 2, s * row + s / 2, s / 3, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }
  };

  const toggle = (e) => {
    let rect = e.target.getBoundingClientRect();
    let x = Math.floor(
      ((e.clientX ? e.clientX : e.touches[0].clientX) - rect.left) /
        (Math.min(gridSize.height, gridSize.width) / props.zoomLevel)
    );
    let y = Math.floor(
      ((e.clientY ? e.clientY : e.touches[0].clientY) - rect.top) /
        (Math.min(gridSize.height, gridSize.width) / props.zoomLevel)
    );

    props.toggleLife(y, x);
  };

  useEffect(() => {
    let id = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(id);
  }, [gridSize, props.zoomLevel, props.gameGrid]);

  return (
    <div ref={grid} className="grid">
      <canvas
        ref={canvas}
        width={gridSize.width}
        height={gridSize.height}
        onMouseDown={(e) => {
          setIsClicked(true);
          toggle(e);
        }}
        onMouseUp={(e) => {
          setIsClicked(false);
        }}
        onTouchStart={(e) => {
          setIsClicked(true);
          toggle(e);
        }}
        onTouchEnd={(e) => {
          setIsClicked(false);
        }}
        onMouseMove={(e) => {
          if (!isClicked) {
            return;
          }
          toggle(e);
        }}
        onTouchMove={(e) => {
          if (!isClicked) {
            return;
          }
          toggle(e);
        }}
      ></canvas>
    </div>
  );
}

export default LifeGrid;
