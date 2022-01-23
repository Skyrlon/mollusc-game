import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

export default function Canvas({ width, height, draw }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    draw(context);
  });

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
}

Canvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  draw: PropTypes.func.isRequired,
};
