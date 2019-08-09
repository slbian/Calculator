import React, { useEffect, useContext } from 'react'; // useState, useReducer
import './App.css';
import styled from 'styled-components';

import Calculator from './components/Calculator';
import Scoreboard from './components/Scoreboard';
import Profile from './components/Profile';
import Login from './components/Login';
import StylePicker from './components/StylePicker';
import { Store } from './state/store';
import { setActiveUser, setUsers } from './state/actions';
import getAllUsers from './api/getAllUsers';

// NEXT TODO: alphabetize all imports, remove unecessary props
// TODO: order the scoreboard, change eval, drop shadows, styled components w/ styling w database, cleanup/layering, authorization, live data, error handling/defensive programming, testing
// DONE: database, add useState hooks, refactor to useReducer

// styled components:
// 1. make clickable circles under profile
// 2. make database

const StyledDiv = styled.div`
  background-color: ${props => props.backgroundColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;

  .header {
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    color: rosybrown;
  }

  .mainpanel {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
  }
  .sidepanel {
    background-color: #98cbec;
    display: flex;
    justify-content: right;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    height: 100vh;
  }
  .profileConfig {
    background-color: #909030;
    width: 230px;
    height: ${props => (props.isOpen ? '110px' : '0px')};
    overflow: hidden;
    transition: all 0.5s;
  }
`;

export default function App() {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    if (!state.users) {
      mount();
    }
  });

  if (!state.users || !state.activeUser) return <p> Loading calculator...</p>;

  return (
    <StyledDiv isOpen={state.profileConfigOpen} backgroundColor={state.activeUser.backgroundColor}>
      <div className="header">Welcome to {state.activeUser.username}'s calculator!</div>
      <div className="mainpanel">
        <Calculator />
      </div>
      <div className="sidepanel">
        <div className="profile">
          <Profile username={state.activeUser.username} score={state.activeUser.score} />
        </div>
        <div className="profileConfig">
          <Login />
          <StylePicker />
        </div>
        <div className="scoreboard">
          <Scoreboard users={state.users} />
        </div>
      </div>
    </StyledDiv>
  );

  async function mount() {
    console.log('MOUNT');
    const response = await getAllUsers();
    dispatch(setUsers(response.data));
    dispatch(setActiveUser(response.data[0]));
  }
}
