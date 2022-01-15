import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

function convertOneDigitNumberToTwo(number) {
  return parseInt(number) < 10 ? `0${number}` : number;
}

export default function GameCountdown({ time, timesUp }) {
  const [timeLeft, setTimeLeft] = useState(time);

  const countdown = useRef(null);

  useEffect(() => {
    countdown.current = setInterval(() => {
      setTimeLeft((v) => v - 1);
    }, 1000);
    return () => clearInterval(countdown.current);
  });

  useEffect(
    () => {
      if (timeLeft <= 0) {
        timesUp();
      }
    },
    // eslint-disable-next-line
    [timeLeft]
  );

  return (
    <span>
      {`${convertOneDigitNumberToTwo(
        Math.floor(timeLeft / 60)
      )}:${convertOneDigitNumberToTwo(timeLeft % 60)}`}
    </span>
  );
}

GameCountdown.propTypes = {
  time: PropTypes.number.isRequired,
  timesUp: PropTypes.func.isRequired,
};
