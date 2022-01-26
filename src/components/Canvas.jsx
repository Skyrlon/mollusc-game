import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

export default function Canvas({ width, height, draw, onClick }) {
  const canvasRef = useRef(null);

  const handleOnClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    onClick({
      ctx: canvasRef.current.getContext("2d"),
      x:
        ((e.clientX - rect.left) / (rect.right - rect.left)) *
        canvasRef.current.width,
      y:
        ((e.clientY - rect.top) / (rect.bottom - rect.top)) *
        canvasRef.current.height,
    });
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    draw(context);
  });

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleOnClick}
    ></canvas>
  );
}

Canvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  draw: PropTypes.func.isRequired,
};
