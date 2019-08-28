import React, { useContext } from 'react';
import styled from 'styled-components';
import { toggleAuth } from '../state/actions';
import { Store } from '../state/store';

const StyledDiv = styled.div`
  text-align: center;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  align-items: justify;
  justify-content: center;

  button {
    border: none;
    height: 20px;
    text-transform: uppercase;
    background: transparent;
    font-size: 16px;
    outline: none;
    margin: 5px;
    color: white;
    font-weight: normal;

    :active {
      font-weight: bold;
    }
    ::selection {
      background: transparent;
    }
  }
`;

export default function Login() {
  const { dispatch } = useContext(Store);
  return (
    <StyledDiv>
      <button type="button" onClick={() => dispatch(toggleAuth('login'))}>
        login
      </button>
      <button type="button" onClick={() => dispatch(toggleAuth('register'))}>
        register
      </button>
    </StyledDiv>
  );
}
