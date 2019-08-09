import React from 'react';
import styled from 'styled-components';
import Numbers from './Numbers';
import Operators from './Operators';
import Screen from './Screen';

const StyledDiv = styled.div`
  background-color: yellow;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, 0.2);
  max-width: 270px;
  padding: 15px;
  border-radius: 10px;
  .calcultor {
    border: 1px solid black;
    padding: 15px;
    width: 260px;
    display: flex;
    flex-direction: column;
  }
  .controls {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default function Calculator() {
  return (
    <StyledDiv>
      <div className="calculator">
        <Screen />
        <div className="controls">
          <Numbers />
          <Operators />
        </div>
      </div>
    </StyledDiv>
  );
}
