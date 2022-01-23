import { useState } from "react";
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
    width: 80%;
  }
`;

export default function DalgonaShape({ shape }) {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  const canvasSizes = [
    { name: "circle", width: 150, height: 150 },
    { name: "star", width: 60, height: 60 },
    { name: "triangle", width: 100, height: 100 },
    { name: "umbrella", width: 570, height: 530 },
  ];

  const draw = (ctx) => {
    setWidth(canvasSizes.find((x) => x.name === shape).width);
    setHeight(canvasSizes.find((x) => x.name === shape).height);
    let path = null;
    if (shape === "circle") {
      ctx.beginPath();
      ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    if (shape === "star") {
      path = new Path2D(
        "M55.818 21.578a1.002 1.002 0 00-.808-.681l-18.09-2.629-8.09-16.392a.998.998 0 00-1.792 0l-8.091 16.393-18.09 2.629a1.002 1.002 0 00-.555 1.705l13.091 12.76-3.091 18.018c-.064.375.09.754.397.978a.992.992 0 001.053.076l16.182-8.506 16.18 8.506a1 1 0 001.451-1.054l-3.09-18.017 13.091-12.761c.272-.267.37-.664.252-1.025z"
      );
      ctx.translate(2, 0);
      ctx.lineWidth = 1;
      ctx.stroke(path);
    }
    if (shape === "triangle") {
      path = new Path2D("M50 1l49 98H1z");
      ctx.lineWidth = 1;
      ctx.stroke(path);
    }
    if (shape === "umbrella") {
      path = new Path2D(
        "M294.202 61.183V48.759c0-9.18-7.439-16.619-16.619-16.619s-16.619 7.439-16.619 16.619v12.424C122.217 68.187 10.839 162.279 0 280.646c13.491-9.683 33.959-15.864 56.882-15.864 35.673 0 65.396 14.96 72.121 34.81h2.958c6.896-19.721 36.53-34.551 72.046-34.551 22.991 0 43.466 6.236 56.957 15.966v166.668c0 23.216-18.891 42.105-42.105 42.105-23.215 0-42.106-18.89-42.106-42.105 0-9.18-7.439-16.619-16.619-16.619s-16.619 7.439-16.619 16.619c0 41.548 33.803 75.352 75.351 75.352s75.337-33.804 75.337-75.352v-166.94c13.484-9.724 33.952-15.953 56.93-15.953 35.673 0 65.396 14.96 72.121 34.81h2.958c6.895-19.721 36.529-34.551 72.046-34.551 22.937 0 43.418 6.188 56.909 15.885-10.69-118.498-122.122-212.725-260.965-219.743z"
      );
      ctx.translate(10, 0);
      ctx.lineWidth = 10;
      ctx.stroke(path);
    }
  };

  return (
    <StyledDalgonaShape>
      <Canvas draw={draw} width={width} height={height} />
    </StyledDalgonaShape>
  );
}

DalgonaShape.propTypes = {
  shape: PropTypes.string.isRequired,
};
