import React, { useRef, useState, useEffect } from "react";
import LifeTile from "./LifeTile";
import "./LifeGrid.css";
import useRefSize from "../hooks/useRefSize";

function LifeGrid(props) {
  const ref = useRef(null);
  const gridSize = useRefSize(ref);
  const [tileSize, setTileSize] = useState(0);

  useEffect(() => {
    setTileSize(Math.min(gridSize.height, gridSize.width) / props.zoomLevel);
  }, [gridSize, props.zoomLevel]);

  return (
    <div ref={ref} className="grid d-flex">
      <LifeTile size={tileSize}></LifeTile>
    </div>
  );
}

export default LifeGrid;
