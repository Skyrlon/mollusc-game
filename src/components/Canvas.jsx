import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

export default function Canvas({ width, height, drawShape, onDrawing }) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(null);

  const handleDraw = (e) => {
    if (isDrawing.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      onDrawing({
        ctx: canvasRef.current.getContext("2d"),
        x:
          ((e.clientX - rect.left) / (rect.right - rect.left)) *
          canvasRef.current.width,
        y:
          ((e.clientY - rect.top) / (rect.bottom - rect.top)) *
          canvasRef.current.height,
      });
    }
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    drawShape(context);
  });

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={() => (isDrawing.current = true)}
      onMouseUp={() => (isDrawing.current = false)}
      onMouseMove={handleDraw}
    ></canvas>
  );
}

Canvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  draw: PropTypes.func.isRequired,
  onDrawing: PropTypes.func.isRequired,
};
