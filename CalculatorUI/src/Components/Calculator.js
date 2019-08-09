import React from 'react';
import Numbers from './Numbers';
import Operators from './Operators';
import Screen from './Screen';

export default function Calculator() {
  return (
    <div>
      My calculator
      <div className="calculator">
        <Screen />
        <div className="controls">
          <Numbers />
          <Operators />
        </div>
      </div>
    </div>
  );
}
