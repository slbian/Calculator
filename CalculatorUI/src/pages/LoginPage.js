import React from 'react';
import styled from 'styled-components';

import Login from '../components/Login';

const StyledDiv = styled.div`
  background-color: seagreen;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
`;

export default function LoginPage() {
  // useEffect(() => {
  //   window.localStorage.clear();
  // }, []);

  return (
    <StyledDiv>
      <p>Please log in to use the calculator!</p>
      <Login />
    </StyledDiv>
  );
}
