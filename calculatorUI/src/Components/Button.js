import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  padding: 5px 15px;
  border-radius: 6px;
  min-width: 25px;
  margin: 2px;
  text-align: center;
  background-color: orange;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, 0.2);
  cursor: pointer;
  color: #252525;

  :active {
    box-shadow: none;
  }

  ::selection {
    background: transparent;
  }
`;

export default function Operators({ handleClick, text }) {
  return (
    <StyledDiv className="button" onClick={() => handleClick(text)}>
      {text}
    </StyledDiv>
  );
}
