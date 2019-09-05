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
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, 0.2);

  span {
    margin-right: 10px;
    text-transform: lowercase;
    font-weight: 400;
    letter-spacing: 2px;
    text-align: center;
  }
`;
export default function Profile({ username, score }) {
  const { dispatch } = useContext(Store);
  return (
    <StyledDiv onClick={() => dispatch(toggleProfileConfig())}>
      <span role="img" aria-label="fire-emoji">
        🔥
      </span>
      <span>
        {username} : {score}
      </span>
    </StyledDiv>
  );
}
