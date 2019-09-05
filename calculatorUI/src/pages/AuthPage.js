import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../state/store';

import Login from '../components/Login';
import Register from '../components/Register';
import AuthChoices from '../components/AuthChoices';

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
  const { state } = useContext(Store);
  useEffect(() => {
    window.localStorage.clear();
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
