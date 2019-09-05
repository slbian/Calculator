import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from './Button';
import {
  clearScreen,
  addCharacter,
  setDisplayText,
  setCleared,
  setActiveUser,
  setUsers
} from '../../state/actions';
import { Store } from '../../state/store';
import postExecution from '../../api/postExecution';
import getScoreboardUsers from '../../api/getScoreboardUsers';
import getActiveUser from '../../api/getActiveUser';

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  overflow-wrap: normal;
  justify-content: center;
`;

export default function Operators() {
  const { state, dispatch } = useContext(Store);

  const values = ['+', '-'];
  return (
    <StyledDiv>
      <Button text="C" handleClick={handleClear} />
      {values.map(val => (
        <Button text={val} handleClick={handlePlusMinus} key={val} />
      ))}
      <Button text="=" handleClick={evaluate} />
    </StyledDiv>
  );

  function handleClear() {
    dispatch(clearScreen());
  }

  function handlePlusMinus(char) {
    dispatch(addCharacter(char));
  }

  async function evaluate() {
    try {
      const evaluatedValue = eval(state.displayText);
      if (state.isCleared || evaluatedValue === undefined) {
        return;
      }

      const successfulExecution = await postExecution(state.displayText);
      const activeUserResponse = await getActiveUser();

      if (!successfulExecution || !activeUserResponse) throw new Error();

      dispatch(setActiveUser(activeUserResponse.data));
      dispatch(setDisplayText(evaluatedValue));
      dispatch(setCleared());

      const response = await getScoreboardUsers();
      dispatch(setUsers(response.data));
    } catch (error) {
      console.log('ERROR FROM EVAL', error);
      dispatch(clearScreen());
    }
  }
}
