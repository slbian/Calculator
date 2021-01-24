import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../state/store';
import { setActiveUser } from '../state/actions';
import updateActiveUserTheme from '../api/updateActiveUserTheme';
import getActiveUser from '../api/getActiveUser';

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

  /* .tooltip {
    display: inline-block;
    position: relative;
    border-bottom: 1px dotted #666;
    text-align: left;
  } */
`;

const StyledContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  align-items: center;
`;

export default function ThemePicker() {
  const { state, dispatch } = useContext(Store);
  
    async function handleColorPick(themeId) {
      const response = await updateActiveUserTheme(state.activeUser.id, themeId);
      if (!response) {
        console.log('Could not update theme');
        throw new Error();
      }
      const activeUserResponse = await getActiveUser();
      if (!activeUserResponse) throw new Error()
      dispatch(setActiveUser(activeUserResponse.data));
    }

  return (
    <StyledContainer>
      {state.themes.map(theme => (
        // <div className="tooltip" key={availableColor}>

        <StyledButton
          key={theme.color}
          color={theme.color}
          onClick={() => handleColorPick(theme.id)}
        />
      ))}
    </StyledContainer>
  );
}
