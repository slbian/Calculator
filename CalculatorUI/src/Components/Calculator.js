import React from 'react';

import Numbers from './Numbers';
import Operators from './Operators';
import Screen from './Screen';

export default function Calculator(props) {
  return (
    <div>
      My calculator
      <div className="calculator">
        <Screen displayText={props.displayText} />
        <div className="controls">
          <Numbers addCharacter={props.addCharacter} />
          <Operators
            addCharacter={props.addCharacter}
            clearScreen={props.clearScreen}
            evaluate={props.evaluate}
          />
        </div>
      </div>
    </div>
  );
}
