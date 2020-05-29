import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import LifeGrid from "./components/LifeGrid";

function App() {
  const minZoom = 8;
  const maxZoom = 256;

  const [zoom, setZoom] = useState(minZoom);

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
        canZoomIn={zoom > minZoom}
        canZoomOut={zoom < maxZoom}
      ></Header>
      <LifeGrid zoomLevel={zoom}></LifeGrid>
    </div>
  );
}

export default App;
