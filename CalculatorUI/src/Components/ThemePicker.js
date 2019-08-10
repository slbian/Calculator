import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../state/store';
import { pickColor } from '../state/actions';
import setTheme from '../api/setTheme';

const StyledButton = styled.button`
  background: ${props => props.color};
  border-radius: 15px;
  border: none;
  outline: none;
  cursor: pointer;
  margin: 5px;
  padding: 15px;
  color: white;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, 0.2);

  :active {
    box-shadow: none;
  }
`;

const StyledContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  align-items: center;
`;

const availableColors = ['tomato', 'green', 'violet', 'pink'];

export default function ThemePicker() {
  const { state, dispatch } = useContext(Store);
  return (
    <StyledContainer>
      {availableColors.map(availableColor => (
        <StyledButton color={availableColor} onClick={() => handleColorPick(availableColor)} />
      ))}
    </StyledContainer>
  );

  async function handleColorPick(color) {
    const response = await setTheme(state.activeUser.id, color);
    dispatch(pickColor(response.data.theme));
  }
}
