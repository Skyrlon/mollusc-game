import { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Canvas from "./Canvas";

const StyledDalgonasvgData = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid black;
  transform: translateX(-50%) translateY(-50%) scale(1.3);
  width: 15%;
  height: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & canvas {
    width: 100%;
  }
`;

function multiplicateNumberInString(string, factor) {
  const regex = /-?(?:\d*\.)?\d+|[a-z]/gi;
  const newPath = string.match(regex).map((x) => {
    if (isNaN(x)) return x;
    return Number(x) * factor;
  });
  return newPath.join(" ");
}

export default function DalgonasvgData({ svgData, onInteriorShapeDraw }) {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  const canvasStrokeColor = useRef(null);
  const canvasFillColor = useRef(null);
  const canvasLineWidth = useRef(null);

  const drawShape = (ctx) => {
    const resolutionRatio = window.innerWidth / 100;
    const compressionRatio = parseInt(
      svgData.dimensions.width.toString().length
    );
    const finalRatio = resolutionRatio / compressionRatio;
    let path = null;
    const strokeColor = "rgba(0, 0, 0, 255)";
    const fillColor = "rgba(255, 255, 254, 255)";
    let lineWidth = (svgData.dimensions.width * finalRatio) / 30;
    setWidth(svgData.dimensions.width * finalRatio + lineWidth * 2);
    setHeight(svgData.dimensions.height * finalRatio + lineWidth * 2);
    ctx.fillStyle = "blue";
    ctx.fillRect(
      0,
      0,
      svgData.dimensions.width * finalRatio + lineWidth * 2,
      svgData.dimensions.height * finalRatio
    );
    if (svgData.name === "circle") {
      path = new Path2D();
      path.arc(
        svgData.shape.cx * finalRatio,
        svgData.shape.cy * finalRatio,
        svgData.shape.r * finalRatio - lineWidth * 2,
        0,
        Math.PI * 2
      );
    } else {
      path = new Path2D(multiplicateNumberInString(svgData.shape, finalRatio));
    }
    ctx.translate(lineWidth, 0);
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = fillColor;
    ctx.fill(path);
    ctx.strokeStyle = strokeColor;
    ctx.stroke(path);
    canvasLineWidth.current = lineWidth;
    canvasStrokeColor.current = strokeColor;
    canvasFillColor.current = fillColor;
  };

  const handleDrawing = ({ ctx, x, y }) => {
    const imageData = ctx.getImageData(x, y, 1, 1).data;
    if (
      `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, ${imageData[3]})` ===
      canvasStrokeColor.current
    ) {
      ctx.fillStyle = "red";
      ctx.arc(
        x - canvasLineWidth.current,
        y,
        canvasLineWidth.current / 2,
        0,
        2 * Math.PI,
        false
      );
      ctx.fill();
    } else if (
      `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, ${imageData[3]})` ===
      canvasFillColor.current
    ) {
      onInteriorShapeDraw();
    }
  };

  return (
    <StyledDalgonasvgData>
      <Canvas
        drawShape={drawShape}
        width={width}
        height={height}
        onDrawing={handleDrawing}
      />
    </StyledDalgonasvgData>
  );
}

DalgonasvgData.propTypes = {
  svgData: PropTypes.object.isRequired,
  onInteriorShapeDraw: PropTypes.func.isRequired,
};
