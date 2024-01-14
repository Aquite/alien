import "./starscape.css";
import React from "react";

const Starscape = () => {
  const canvasRef = React.useRef(null);
  return <canvas ref={canvasRef} />;
};

export default Starscape;
