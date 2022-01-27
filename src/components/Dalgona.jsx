import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";

import DalgonaCards from "./DalgonaCards";
import DalgonaShape from "./DalgonaShape";

const StyledDalgona = styled.div`
  width: 100%;
  height: 100%;
`;

export default function Dalgona({ startTheGame, gameOver }) {
  const [shapeChosen, setShapeChosen] = useState(null);

  const handleCardChosen = (cardName) => {
    setShapeChosen(cardName);
    startTheGame();
  };

  return (
    <StyledDalgona>
      {!shapeChosen && <DalgonaCards cardChosen={handleCardChosen} />}
      {shapeChosen && (
        <DalgonaShape
          shape={shapeChosen}
          onInteriorShapeDraw={() => gameOver({ win: false })}
        />
      )}
    </StyledDalgona>
  );
}

Dalgona.propTypes = {
  startTheGame: PropTypes.func.isRequired,
};
