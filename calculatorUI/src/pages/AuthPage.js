import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import { logout } from '../state/actions';
import { Store } from '../state/store';
import AuthChoices from '../components/AuthChoices';
import Login from '../components/Login';
import Register from '../components/Register';

const StyledDiv = styled.div`
  background-color: seagreen;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* min-height: 50vh; */
`;

export default function AuthPage() {
  const { state, dispatch } = useContext(Store);
  useEffect(() => {
    window.localStorage.clear();
    dispatch(logout());
  }, []);

  const form = state.authChoice === 'login' ? <Login /> : <Register />;

  return (
    <StyledDiv>
      <p>Sign-in required to use calculator!</p>
      <AuthChoices />
      {form}
    </StyledDiv>
  );

  // function authToggle(authChoice) {
  //   return authChoice === 'login' ? <Login /> : <Register />;
  // }
}
