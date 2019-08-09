import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../state/store';
import { toggleProfileConfig } from '../state/actions';

const StyledDiv = styled.div`
  text-align: left;
  width: 200px;
  font-size: 20px;
  font-weight: bold;
  background-color: #ace2b5;
  color: black;
  padding: 15px;
  min-height: 30px;

  span {
    margin-right: 10px;
  }
`;
export default function Profile({ username, score }) {
  const { dispatch } = useContext(Store);
  return (
    <StyledDiv onClick={() => dispatch(toggleProfileConfig())}>
      <span role="img" aria-label="fire-emoji">
        🔥
      </span>
      {username} : {score}
    </StyledDiv>
  );
}
