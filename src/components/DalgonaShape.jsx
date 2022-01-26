import { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Canvas from "./Canvas";

const StyledDalgonaShape = styled.div`
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

export default function DalgonaShape({ shape }) {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  const canvasSizes = [
    { name: "circle", width: 150, height: 150 },
    { name: "star", width: 51, height: 48 },
    { name: "triangle", width: 100, height: 100 },
    { name: "umbrella", width: 570, height: 530 },
  ];

  const canvasStrokeColor = useRef(null);
  const canvasFillColor = useRef(null);
  const canvasResolutionRatio = useRef(null);

  const draw = (ctx) => {
    const resolutionRatio = window.innerWidth / 100;
    setWidth(canvasSizes.find((x) => x.name === shape).width * resolutionRatio);
    setHeight(
      canvasSizes.find((x) => x.name === shape).height * resolutionRatio
    );
    let path = null;
    const strokeColor = "rgba(0, 0, 0, 255)";
    const fillColor = "rgba(255, 255, 254, 255)";
    if (shape === "circle") {
      path = new Path2D();
      path.arc(
        75 * resolutionRatio,
        75 * resolutionRatio,
        50 * resolutionRatio,
        0,
        Math.PI * 2
      );
      ctx.lineWidth = 5 * resolutionRatio;
      ctx.fillStyle = fillColor;
      ctx.fill(path);
      ctx.strokeStyle = strokeColor;
      ctx.stroke(path);
    }
    if (shape === "star") {
      path = new Path2D(
        multiplicateNumberInString(
          "M25 1l6 17h18L35 29l5 17-15-10-15 10 5-17L1 18h18z",
          resolutionRatio
        )
      );
      ctx.translate(1 * resolutionRatio, 0);
      ctx.lineWidth = 1 * resolutionRatio;
      ctx.fillStyle = fillColor;
      ctx.fill(path);
      ctx.strokeStyle = strokeColor;
      ctx.stroke(path);
    }
    if (shape === "triangle") {
      path = new Path2D(
        multiplicateNumberInString("M50 1l49 98H1z", resolutionRatio)
      );
      ctx.lineWidth = 1 * resolutionRatio;
      ctx.fillStyle = fillColor;
      ctx.fill(path);
      ctx.strokeStyle = strokeColor;
      ctx.stroke(path);
    }
    if (shape === "umbrella") {
      path = new Path2D(
        multiplicateNumberInString(
          "M294.202 61.183V48.759c0-9.18-7.439-16.619-16.619-16.619s-16.619 7.439-16.619 16.619v12.424C122.217 68.187 10.839 162.279 0 280.646c13.491-9.683 33.959-15.864 56.882-15.864 35.673 0 65.396 14.96 72.121 34.81h2.958c6.896-19.721 36.53-34.551 72.046-34.551 22.991 0 43.466 6.236 56.957 15.966v166.668c0 23.216-18.891 42.105-42.105 42.105-23.215 0-42.106-18.89-42.106-42.105 0-9.18-7.439-16.619-16.619-16.619s-16.619 7.439-16.619 16.619c0 41.548 33.803 75.352 75.351 75.352s75.337-33.804 75.337-75.352v-166.94c13.484-9.724 33.952-15.953 56.93-15.953 35.673 0 65.396 14.96 72.121 34.81h2.958c6.895-19.721 36.529-34.551 72.046-34.551 22.937 0 43.418 6.188 56.909 15.885-10.69-118.498-122.122-212.725-260.965-219.743z",
          resolutionRatio
        )
      );
      ctx.translate(10 * resolutionRatio, 0);
      ctx.lineWidth = 10 * resolutionRatio;
      ctx.fillStyle = fillColor;
      ctx.fill(path);
      ctx.strokeStyle = strokeColor;
      ctx.stroke(path);
    }
    canvasStrokeColor.current = strokeColor;
    canvasFillColor.current = fillColor;
    canvasResolutionRatio.current = resolutionRatio;
  };

  const handleClick = ({ ctx, x, y }) => {
    const imageData = ctx.getImageData(x, y, 1, 1).data;
    if (
      `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, ${imageData[3]})` ===
      canvasStrokeColor.current
    ) {
      ctx.fillStyle = "red";
      ctx.fillRect(
        x,
        y,
        1 * canvasResolutionRatio.current,
        1 * canvasResolutionRatio.current
      );
    }
  };

  return (
    <StyledDalgonaShape>
      <Canvas draw={draw} width={width} height={height} onClick={handleClick} />
    </StyledDalgonaShape>
  );
}

DalgonaShape.propTypes = {
  shape: PropTypes.string.isRequired,
};
