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
  align-items: center;
  justify-content: center;
  background-color: #962387;
  color: black;
  padding: 5px;
  min-height: 30px;

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
    border: none;
    height: 22px;
    font-size: 16px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, 0.2);
    border-left: 1px solid #808080;
  }
`;

export default function Login() {
  const { state, dispatch } = useContext(Store);

  return (
    <StyledDiv>
      <input value={state.loginText} onChange={handleChangeLogin} />
      <button type="button" onClick={handleLoginRequest}>
        Login
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
