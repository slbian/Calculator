import React from 'react';
import Button from './Button';

export default function Operators(props) {
  const values = ['+', '-'];
  return (
    <div className="operators">
      <Button text="C" handleClick={() => props.clearScreen()} />
      {values.map(val => (
        <Button text={val} handleClick={props.addCharacter} key={val} />
      ))}
      <Button text="=" handleClick={() => props.evaluate()} />
    </div>
  );
}
