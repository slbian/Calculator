import React from 'react';
import styled from 'styled-components';
import history from '../state/history';

const StyledDiv = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  width: 220px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: black;
  padding: 5px;

  button {
    border-radius: 20px 20px 20px 20px;
    background-color: blueviolet;
    border: none;
    height: 22px;
    color: white;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, 0.2);
    outline: none;

    :active {
      box-shadow: none;
    }
    ::selection {
      background: transparent;
    }
  }
`;

export default function Logout() {
  return (
    <div>
      <StyledDiv>
        <button type="button" onClick={handleLogoutRequest}>
          LOGOUT
        </button>
      </StyledDiv>
    </div>
  );

  async function handleLogoutRequest(event) {
    event.preventDefault();
    window.localStorage.clear();
    history.push('/login');
  }
}
