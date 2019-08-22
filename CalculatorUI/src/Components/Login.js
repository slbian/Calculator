import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import copytext from './Login.copyText';
import getToken from '../api/getToken';
import history from '../state/history';
import { setErrorMessage } from '../state/actions';
import { Store } from '../state/store';

// TODO: make text uncopy-able
const StyledDiv = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  width: 220px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: black;
  padding: 5px;
  min-height: 200px;

  input {
    height: 20px;
    border-radius: 20px 0 0 20px;
    font-size: 16px;
    border: none;
    padding-left: 5px;
    outline: none;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, 0.2);
    width: 150px;

    ::selection {
      background: transparent;
    }
  }

  button {
    border-radius: 0 20px 20px 0;
    background-color: blueviolet;
    border: none;
    height: 22px;
    color: white;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, 0.2);
    border-left: 1px solid #808080;
    outline: none;

    :active {
      box-shadow: none;
    }
    ::selection {
      background: transparent;
    }
  }
`;

export default function Login() {
  // console.log(history);
  const { state, dispatch } = useContext(Store);
  // TODO: refactor to just useContext
  const [username, setUsername] = useState('chuck');
  const [password, setPassword] = useState('welcome');

  return (
    <div>
      <form>
        <StyledDiv>
          <input value={username} type="text" onChange={handleChangeLoginUsername} />
          <button type="button">USER</button>
          <input value={password} type="password" onChange={handleChangeLoginPassword} />
          <button type="submit" onClick={handleLoginRequest}>
            PASS
          </button>
        </StyledDiv>
      </form>
      {state.errorMessage}
    </div>
  );

  // text in login box
  function handleChangeLoginUsername(event) {
    const text = event.target.value;
    setUsername(text);
  }

  function handleChangeLoginPassword(event) {
    const text = event.target.value;
    setPassword(text);
  }

  async function handleLoginRequest(event) {
    event.preventDefault();
    // first need to log in, get token
    const { newToken, errorCode } = await getToken(username, password);
    // put newToken in localstorage, then read from it
    if (newToken) {
      window.localStorage.setItem('token', newToken.data);
      history.push('/');
    }
    if (errorCode === 401) {
      dispatch(setErrorMessage(copytext.errorMessage_auth));
    } else {
      dispatch(setErrorMessage(copytext.errorMessage_default));
    }
  }
}
