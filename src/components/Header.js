import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function Header(props) {
  return (
    <div className="navBarFlex">
      <Navbar.Brand className="navBarTitle">
        <img
          alt=""
          src="/dijitle.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Conway's Game of Life
      </Navbar.Brand>
      <Button variant="success" onClick={props.playPause}>
        {" "}
        {props.isPlaying ? (
          <i className="fas fa-pause"></i>
        ) : (
          <i className="fas fa-play"></i>
        )}{" "}
      </Button>
      <Button variant="info" onClick={props.next}>
        {" "}
        <i className="fas fa-step-forward"></i>{" "}
      </Button>
      <Button onClick={props.zoomIn} disabled={!props.canZoomIn}>
        {" "}
        <i className="fas fa-search-plus"></i>{" "}
      </Button>
      <Button onClick={props.zoomOut} disabled={!props.canZoomOut}>
        {" "}
        <i className="fas fa-search-minus"></i>{" "}
      </Button>
      <Button variant="warning" onClick={props.clear}>
        {" "}
        <i className="fas fa-trash-alt"></i>{" "}
      </Button>
      <Button
        variant={props.bringLife ? "success" : "danger"}
        onClick={props.setBringLife}
      >
        {" "}
        <i
          className={props.bringLife ? "fas fa-spa" : "fas fa-skull-crossbones"}
        ></i>{" "}
      </Button>
    </div>
  );
}

export default Header;
