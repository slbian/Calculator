import React, { useContext } from 'react';
import { Store } from '../state/store';

export default function Screen() {
  const { state } = useContext(Store);
  return <div className="screen">{state.displayText}</div>;
}
