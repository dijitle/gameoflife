import React, { useRef, useState, useEffect } from "react";
import LifeTile from "./LifeTile";
import "./LifeGrid.css";
import useRefSize from "../hooks/useRefSize";

function LifeGrid(props) {
  const ref = useRef(null);
  const gridSize = useRefSize(ref);
  const [tileSize, setTileSize] = useState(0);

  useEffect(() => {
    setTileSize(
      Math.min(Math.min(gridSize.height, gridSize.width) / props.zoomLevel),
      1
    );
  }, [gridSize, props.zoomLevel]);

  return (
    <div ref={ref} className="grid">
      {props.gameGrid.map((row, i) =>
        row.map((col, j) => (
          <LifeTile
            key={i * 10000 + j}
            size={tileSize}
            state={col}
            toggle={() => props.toggleLife(i, j)}
          ></LifeTile>
        ))
      )}
    </div>
  );
}

export default LifeGrid;
