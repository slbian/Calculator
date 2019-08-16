import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import Login from '../components/Login';

const StyledDiv = styled.div`
  background-color: seagreen;
  align-items: center;
`;

export default function LoginPage() {
  return (
    <StyledDiv>
      <p>Please log in to use the calculator!</p>
      <Login />
    </StyledDiv>
  );
}
