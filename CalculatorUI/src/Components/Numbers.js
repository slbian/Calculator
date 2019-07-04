import React from 'react';
import Button from './Button';

export default function Numbers(props) {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <div className="numbers">
      {/* <Button /> */}
      {values.map(val => (
        <Button text={val} handleClick={props.addCharacter} key={val} />
      ))}
    </div>
  );
}
