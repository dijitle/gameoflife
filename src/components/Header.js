import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function Header(props) {
  return (
    <Navbar bg="dark" variant="dark">
      Conway's Game of Life
      <Button onClick={props.next}> Next </Button>
      <Button onClick={props.zoomIn} disabled={!props.canZoomIn}>
        {" "}
        +{" "}
      </Button>
      <Button onClick={props.zoomOut} disabled={!props.canZoomOut}>
        {" "}
        -{" "}
      </Button>
    </Navbar>
  );
}

export default Header;
