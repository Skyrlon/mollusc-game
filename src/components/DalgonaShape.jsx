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

export default function DalgonasvgData({ svgData, onInteriorsvgDataDraw }) {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  const canvasStrokeColor = useRef(null);
  const canvasFillColor = useRef(null);
  const canvasResolutionRatio = useRef(null);
  const canvasLineWidth = useRef(null);

  const drawShape = (ctx) => {
    const resolutionRatio = window.innerWidth / 100;
    setWidth(svgData.dimensions.width * resolutionRatio);
    setHeight(svgData.dimensions.height * resolutionRatio);
    let path = null;
    const strokeColor = "rgba(0, 0, 0, 255)";
    const fillColor = "rgba(255, 255, 254, 255)";
    let lineWidth = null;
    if (svgData.name === "circle") {
      lineWidth = 5 * resolutionRatio;
      path = new Path2D();
      path.arc(
        svgData.shape.cx * resolutionRatio,
        svgData.shape.cy * resolutionRatio,
        svgData.shape.r * resolutionRatio - lineWidth * 2,
        0,
        Math.PI * 2
      );

      ctx.lineWidth = lineWidth;
      ctx.fillStyle = fillColor;
      ctx.fill(path);
      ctx.strokeStyle = strokeColor;
      ctx.stroke(path);
    }
    if (svgData.name === "star") {
      path = new Path2D(
        multiplicateNumberInString(svgData.shape, resolutionRatio)
      );
      lineWidth = 1 * resolutionRatio;
      ctx.translate(lineWidth, 0);
      ctx.lineWidth = lineWidth;
      ctx.fillStyle = fillColor;
      ctx.fill(path);
      ctx.strokeStyle = strokeColor;
      ctx.stroke(path);
    }
    if (svgData.name === "triangle") {
      path = new Path2D(
        multiplicateNumberInString(svgData.shape, resolutionRatio)
      );
      lineWidth = 1 * resolutionRatio;
      ctx.lineWidth = lineWidth;
      ctx.fillStyle = fillColor;
      ctx.fill(path);
      ctx.strokeStyle = strokeColor;
      ctx.stroke(path);
    }
    if (svgData.name === "umbrella") {
      path = new Path2D(
        multiplicateNumberInString(svgData.shape, resolutionRatio)
      );
      lineWidth = 10 * resolutionRatio;
      ctx.translate(lineWidth, 0);
      ctx.lineWidth = lineWidth;
      ctx.fillStyle = fillColor;
      ctx.fill(path);
      ctx.strokeStyle = strokeColor;
      ctx.stroke(path);
    }
    canvasLineWidth.current = lineWidth;
    canvasStrokeColor.current = strokeColor;
    canvasFillColor.current = fillColor;
    canvasResolutionRatio.current = resolutionRatio;
  };

  const handleDrawing = ({ ctx, x, y }) => {
    const imageData = ctx.getImageData(x, y, 1, 1).data;
    if (
      `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, ${imageData[3]})` ===
      canvasStrokeColor.current
    ) {
      ctx.fillStyle = "red";
      ctx.fillRect(x, y, canvasLineWidth.current, canvasLineWidth.current);
    } else if (
      `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, ${imageData[3]})` ===
      canvasFillColor.current
    ) {
      onInteriorsvgDataDraw();
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
  onInteriorsvgDataDraw: PropTypes.func.isRequired,
};
