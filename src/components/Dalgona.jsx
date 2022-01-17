import PropTypes from "prop-types";
import styled from "styled-components";

import DalgonaCards from "./DalgonaCards";

const StyledDalgona = styled.div`
  width: 100%;
  height: 100%;
`;

export default function Dalgona({ startTheGame }) {
  return (
    <StyledDalgona>
      <DalgonaCards cardChosen={startTheGame} />
    </StyledDalgona>
  );
}

Dalgona.propTypes = {
  startTheGame: PropTypes.func.isRequired,
};
