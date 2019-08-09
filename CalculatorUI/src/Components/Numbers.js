import React, { useContext } from 'react';
import Button from './Button';
import { addCharacter } from '../state/actions';
import { Store } from '../state/store';

export default function Numbers() {
  const { dispatch } = useContext(Store);

  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <div className="numbers">
      {values.map(val => (
        <Button text={val} handleClick={handleClick} key={val} />
      ))}
    </div>
  );

  function handleClick(text) {
    dispatch(addCharacter(text));
  }
}
