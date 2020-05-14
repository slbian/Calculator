import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../../state/store';

const StyledDiv = styled.div`
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  background-color: #888888;
  color: #404040;
  padding: 5px;
  min-height: 25px;
  border-radius: 10px;
  overflow-x: auto;
  box-shadow: inset 3px 3px 3px rgba(0, 0, 255, 0.2);
`;

export default function Screen() {
  const { state } = useContext(Store);
  return <StyledDiv>{state.displayText}</StyledDiv>;
}
