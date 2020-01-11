import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../state/store';
import { toggleProfileConfig } from '../state/actions';

const StyledDiv = styled.div`
  /* text-align: left; */
  width: 200px;
  font-size: 20px;
  font-weight: bold;
  background-color: #ace2b5;
  color: black;
  padding: 15px;
  padding-bottom: 5px;
  min-height: 30px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, 0.2);
  
  display: flex;
  flex-direction: column;
  align-content: center;

  upper {
    text-align: left;
    padding-bottom: 5px;
  }

  span {
    margin-right: 10px;
    text-transform: lowercase;
    font-weight: 400;
    letter-spacing: 2px;
    text-align: center;
  };

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 20px;
  }
`;
export default function Profile({ username, score }) {
  const { state, dispatch } = useContext(Store);
  
  const arrow=state.profileConfigOpen ? 'https://image.flaticon.com/icons/png/512/25/25649.png' : 'https://image.flaticon.com/icons/png/512/25/25629.png';
  return (
    <StyledDiv onClick={() => dispatch(toggleProfileConfig())}>
      <upper><span role="img" aria-label="fire-emoji">
        🔥
      </span>
      <span>
        {username} : {score}
      </span></upper>
      <img src={arrow} ></img>
    </StyledDiv>
  );
}
