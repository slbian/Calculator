import React, { useState } from 'react';
import styled from 'styled-components';

import copytext from './Login.copyText';
import getToken from '../api/getToken';
import history from '../state/history';

// TODO: make text uncopy-able
const StyledDiv = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  padding: 5px;

  header {
    height: 20px;
  }

  input {
    height: 20px;
    border-radius: 20px 20px 20px 20px;
    font-size: 16px;
    border: none;
    padding-left: 5px;
    outline: none;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, 0.2);
    width: 150px;
    margin: 5px;

    ::selection {
      background: transparent;
    }
  }

  button {
    border-radius: 20px 20px 20px 20px;
    background-color: blueviolet;
    border: none;
    height: 20px;
    color: white;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, 0.2);
    outline: none;
    width: 155px;
    margin: 5px;

    :active {
      box-shadow: none;
    }
    ::selection {
      background: transparent;
    }
  }
`;

export default function Login() {
  const [loginUsername, setLoginUsername] = useState('sbian');
  const [loginPassword, setLoginPassword] = useState('welcome');
  const [loginMessage, setLoginMessage] = useState('');

  function handleChangeLoginPassword(event) {
    const text = event.target.value;
    setLoginPassword(text);
  }

  function handleChangeLoginUsername(event) {
    const text = event.target.value;
    setLoginUsername(text);
  }

  async function handleLoginRequest(event) {
    event.preventDefault();
    // first need to log in, get token
    const { newToken, errorCode } = await getToken(loginUsername, loginPassword);
    // put newToken in localstorage, then read from it
    if (newToken) {
      window.localStorage.setItem('token', newToken.data);
      // console.log('login ', newToken.data);
      history.push('/');
    }
    if (errorCode === 401) {
      setLoginMessage(copytext.errorMessage_auth);
    } else {
      setLoginMessage(copytext.errorMessage_default);
    }
  }

  return (
    <div>
      <form>
        <StyledDiv>
          <input
            value={loginUsername}
            placeholder="username"
            type="text"
            onChange={handleChangeLoginUsername}
          />
          <input
            value={loginPassword}
            placeholder="password"
            type="password"
            onChange={handleChangeLoginPassword}
          />
          <button type="submit" onClick={handleLoginRequest}>
            login
          </button>
        </StyledDiv>
      </form>
      {loginMessage}
    </div>
  );

  // text in login box
}
