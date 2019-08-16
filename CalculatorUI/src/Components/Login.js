import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../state/store';
import {
  clearScreen,
  setLoginTextUsername,
  setLoginTextPassword,
  setActiveUser
} from '../state/actions';
import postLogin from '../api/postLogin';
import getToken from '../api/getToken';

const StyledDiv = styled.div`
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  width: 220px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: black;
  padding: 5px;
  min-height: 40px;

  input {
    height: 20px;
    border-radius: 20px 0 0 20px;
    font-size: 16px;
    border: none;
    padding-left: 5px;
    outline: none;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, 0.2);
    width: 150px;
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
  }
`;

export default function Login() {
  const { state, dispatch } = useContext(Store);

  return (
    <div>
      <StyledDiv>
        <input value={state.loginTextUsername} onChange={handleChangeLoginUsername} />
        <button type="button">USER</button>
      </StyledDiv>
      <StyledDiv>
        <input value={state.loginTextPassword} onChange={handleChangeLoginPassword} />
        <button type="button" onClick={handleLoginRequest}>
          PASS
        </button>
      </StyledDiv>
    </div>
  );

  // text in login box
  function handleChangeLoginUsername(event) {
    const text = event.target.value;
    dispatch(setLoginTextUsername(text));
  }

  function handleChangeLoginPassword(event) {
    const text = event.target.value;
    dispatch(setLoginTextPassword(text));
  }

  async function handleLoginRequest() {
    // first need to log in, get token
    const newToken = await getToken(state.loginTextUsername, state.loginTextPassword);
    // put newToken in localstorage, then read from it
    console.log(
      'username=',
      state.loginTextUsername,
      'password=',
      state.loginTextPassword,
      'token=',
      newToken
    );
    if (newToken) {
      window.localStorage.setItem('token', newToken.data);
      const config = {
        headers: { Authorization: 'bearer '.concat(window.localStorage.getItem('token')) }
      };

      const activeUser = await postLogin(state.loginTextUsername, config);
      console.log('activeUser', activeUser);

      if (activeUser) {
        dispatch(setActiveUser(activeUser.data));
        dispatch(setLoginTextUsername(''));
        dispatch(setLoginTextPassword(''));
        dispatch(clearScreen());
      }
    }
  }
}

// function tokenSuccess(err, response) {
//   if (err) {
//     throw err;
//   }
//   $window.sessionStorage.accessToken = response.body.access_token;
// }
