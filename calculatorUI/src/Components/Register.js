import React, { useState } from 'react';
import styled from 'styled-components';

import copytext from './Register.copyText';
import postUser from '../api/postUser';

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

export default function Register() {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPassword2, setRegisterPassword2] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');

  return (
    <div>
      <form>
        <StyledDiv>
          <input
            value={registerUsername}
            placeholder="username"
            type="text"
            onChange={handleChangeRegisterUsername}
          />
          <input
            value={registerPassword}
            placeholder="password"
            type="password"
            onChange={handleChangeRegisterPassword}
          />
          <input
            value={registerPassword2}
            placeholder="username"
            type="password"
            onChange={handleChangeRegisterPassword2}
          />
          <button type="submit" onClick={handleRegisterRequest}>
            register
          </button>
        </StyledDiv>
      </form>
      {registerMessage}
    </div>
  );

  // text in Register box
  function handleChangeRegisterUsername(event) {
    const text = event.target.value;
    setRegisterUsername(text);
  }

  function handleChangeRegisterPassword(event) {
    const text = event.target.value;
    setRegisterPassword(text);
  }

  function handleChangeRegisterPassword2(event) {
    const text = event.target.value;
    setRegisterPassword2(text);
  }

  async function handleRegisterRequest(event) {
    event.preventDefault();
    if (registerPassword !== registerPassword2) {
      setRegisterMessage(copytext.errorMessage_password);
      return;
    }
    const response = await postUser(registerUsername, registerPassword);
    if (response.data) {
      setRegisterMessage(copytext.success);
      return;
    }
    if (response.errorCode === 409) {
      setRegisterMessage(copytext.errorMessage_auth);
    } else {
      setRegisterMessage(copytext.errorMessage_default);
    }
  }
}
