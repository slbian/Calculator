import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../state/store';
import { pickColor } from '../state/actions';
import setTheme from '../api/setTheme';
import getToken from '../api/getToken';

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

  .tooltip {
    display: inline-block;
    position: relative;
    border-bottom: 1px dotted #666;
    text-align: left;
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
        <div className="tooltip">
          <StyledButton color={availableColor} onClick={() => handleColorPick(availableColor)} />
        </div>
      ))}
    </StyledContainer>
  );

  async function handleColorPick(color) {
    const newToken = await getToken('chuck', 'welcome');
    const config = {
      headers: { Authorization: 'bearer '.concat(newToken.data) }
    };
    const response = await setTheme(state.activeUser.id, color, config);
    dispatch(pickColor(response.data.theme));
  }
}
