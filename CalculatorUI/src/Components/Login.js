import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../state/store';
import { clearScreen, setLoginText, setActiveUser } from '../state/actions';
import postLogin from '../api/postLogin';

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
    <StyledDiv>
      <input value={state.loginText} onChange={handleChangeLogin} />
      <button type="button" onClick={handleLoginRequest}>
        LOGIN
      </button>
    </StyledDiv>
  );

  // text in login box
  function handleChangeLogin(event) {
    const text = event.target.value;
    dispatch(setLoginText(text));
  }

  async function handleLoginRequest() {
    const activeUser = await postLogin(state.loginText);

    dispatch(setActiveUser(activeUser.data));
    dispatch(setLoginText(''));
    dispatch(clearScreen());
  }
}

// function tokenSuccess(err, response) {
//   if (err) {
//     throw err;
//   }
//   $window.sessionStorage.accessToken = response.body.access_token;
// }
