import React from 'react';
import { isNull } from 'util';

export default function Login(props) {
  return (
    <div className="login">
      LOGIN:
      <input value={props.loginText} onChange={props.changeLogin} />
      <button onClick={() => props.requestLogin()}> login </button>
    </div>
  );
}
