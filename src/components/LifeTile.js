import React from "react";

import "./LifeTile.css";

function LifeTile(props) {
  return (
    <div
      className={props.state ? "tile alive" : "tile dead"}
      style={{ width: props.size, height: props.size }}
      onClick={props.toggle}
    ></div>
  );
}

export default LifeTile;
