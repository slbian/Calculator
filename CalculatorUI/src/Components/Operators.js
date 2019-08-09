import React, { useContext } from 'react';
import Button from './Button';
import {
  clearScreen,
  addCharacter,
  setDisplayText,
  setCleared,
  setActiveUser,
  setUsers
} from '../state/actions';
import { Store } from '../state/store';
import incrementScore from '../api/incrementScore';
import getAllUsers from '../api/getAllUsers';

export default function Operators() {
  const { state, dispatch } = useContext(Store);

  const values = ['+', '-'];
  return (
    <div className="operators">
      <Button text="C" handleClick={handleClear} />
      {values.map(val => (
        <Button text={val} handleClick={handlePlusMinus} key={val} />
      ))}
      <Button text="=" handleClick={evaluate} />
    </div>
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

      const userWithNewScore = await incrementScore(state.activeUser.username, state.displayText);

      const newActiveUser =
        userWithNewScore.data.username === state.activeUser.username
          ? {
              username: state.activeUser.username,
              score: Number(userWithNewScore.data.newScore)
            }
          : state.activeUser;

      dispatch(setDisplayText(evaluatedValue));
      dispatch(setCleared());
      dispatch(setActiveUser(newActiveUser));

      const response = await getAllUsers();
      dispatch(setUsers(response.data));
    } catch (error) {
      console.log('ERROR FROM EVAL', error);
      dispatch(clearScreen());
    }
  }
}
