import "./starscape.css";

const Starscape = () => {
  const canvasRef = React.useRef(null);
  return <canvas ref={canvasRef} />;
};

export default Starscape;
