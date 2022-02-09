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
  const outsideShapeColor = useRef(null);

  const drawShape = (ctx) => {
    const resolutionRatio = window.innerWidth / 100;
    const compressionRatio = parseInt(
      svgData.dimensions.width.toString().length
    );
    const finalRatio = resolutionRatio / compressionRatio;
    let path = null;
    const strokeColor = "rgba(0, 0, 0, 255)";
    const fillColor = "rgba(255, 255, 254, 255)";
    const outsideColor = "rgba(0, 0, 255, 255)";
    let lineWidth = (svgData.dimensions.width * finalRatio) / 30;
    setWidth(svgData.dimensions.width * finalRatio + lineWidth * 2);
    setHeight(svgData.dimensions.height * finalRatio + lineWidth * 2);
    ctx.fillStyle = outsideColor;
    ctx.fillRect(
      0,
      0,
      svgData.dimensions.width * finalRatio + lineWidth * 2,
      svgData.dimensions.height * finalRatio + lineWidth * 2
    );
    if (svgData.name === "circle") {
      path = new Path2D();
      path.arc(
        svgData.shape.cx * finalRatio,
        svgData.shape.cy * finalRatio,
        svgData.shape.r * finalRatio,
        0,
        Math.PI * 2
      );
    } else {
      path = new Path2D(multiplicateNumberInString(svgData.shape, finalRatio));
    }
    ctx.translate(lineWidth, lineWidth);
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = fillColor;
    ctx.fill(path);
    ctx.strokeStyle = strokeColor;
    ctx.stroke(path);
    canvasLineWidth.current = lineWidth;
    canvasStrokeColor.current = strokeColor;
    canvasFillColor.current = fillColor;
    outsideShapeColor.current = outsideColor;
  };

  const handleDrawing = ({ ctx, x, y }) => {
    const imageData = ctx.getImageData(x, y, 1, 1);
    const data = imageData.data;
    if (
      `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})` ===
        canvasStrokeColor.current ||
      `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})` ===
        canvasStrokeColor.current
    ) {
      const drawZoneImageData = ctx.getImageData(
        x - canvasLineWidth.current / 2,
        y - canvasLineWidth.current / 2,
        canvasLineWidth.current * 1.5,
        canvasLineWidth.current * 1.5
      );

      const drawZoneData = drawZoneImageData.data;

      const drawZoneImage = ctx.createImageData(
        canvasLineWidth.current * 1.5,
        canvasLineWidth.current * 1.5
      );

      for (let i = 0; i < drawZoneData.length; i += 4) {
        if (
          `rgba(${drawZoneData[i + 0]}, ${drawZoneData[i + 1]}, ${
            drawZoneData[i + 2]
          }, ${drawZoneData[i + 3]})` === canvasStrokeColor.current
        ) {
          drawZoneImage.data[i + 0] = 255;
          drawZoneImage.data[i + 1] = 0;
          drawZoneImage.data[i + 2] = 0;
          drawZoneImage.data[i + 3] = 255;
        } else if (
          `rgba(${drawZoneData[i + 0]}, ${drawZoneData[i + 1]}, ${
            drawZoneData[i + 2]
          }, ${drawZoneData[i + 3]})` === canvasFillColor.current ||
          `rgba(${drawZoneData[i + 0]}, ${drawZoneData[i + 1]}, ${
            drawZoneData[i + 2]
          }, ${drawZoneData[i + 3]})` === outsideShapeColor.current
        ) {
          drawZoneImage.data[i + 0] = drawZoneData[i + 0];
          drawZoneImage.data[i + 1] = drawZoneData[i + 1];
          drawZoneImage.data[i + 2] = drawZoneData[i + 2];
          drawZoneImage.data[i + 3] = drawZoneData[i + 3];
        } else {
          drawZoneImage.data[i + 0] = 255;
          drawZoneImage.data[i + 1] = 0;
          drawZoneImage.data[i + 2] = 0;
          drawZoneImage.data[i + 3] = 255;
        }
      }
      createImageBitmap(drawZoneImage).then((res) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(
          x - (canvasLineWidth.current * 1.5) / 2,
          y - (canvasLineWidth.current * 1.5) / 2,
          canvasLineWidth.current * 0.75,
          0,
          Math.PI * 2,
          false
        );
        ctx.clip();
        ctx.drawImage(
          res,
          x - canvasLineWidth.current * 1.5,
          y - canvasLineWidth.current * 1.5
        );
        ctx.restore();
      });
    } else if (
      `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})` ===
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
