import React, { useEffect, useContext } from 'react'; // useState, useReducer
import styled from 'styled-components';

import './App.css';
import { setActiveUser, setUsers } from './state/actions';
import { Store } from './state/store';
import Calculator from './components/Calculator';
import getAllUsers from './api/getAllUsers';
import Login from './components/Login';
import Profile from './components/Profile';
import Scoreboard from './components/Scoreboard';
import ThemePicker from './components/ThemePicker';
// import green from ${state.activeUser};

// NEXT TODO: alphabetize all imports, remove unecessary props
// TODO: order the scoreboard, change eval, drop shadows, styled components w/ styling w database, cleanup/layering, authorization, live data, error handling/defensive programming, testing
// DONE: database, add useState hooks, refactor to useReducer

// PROPS ARE NOT RERENDERING WHEN STATE CHANGES - something async is off
const StyledDiv = styled.div`
  /* background-color: ${props => props.theme}; */
  background-image: url(${props => props.themePath}) ;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;

  .header {
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    color: rosybrown;
    text-transform: lowercase;
    font-weight: 500;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 50px;
  }

  .mainpanel {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;

    /* div:first-of-type {flex-grow: 2}
    div:last-of-type {flex-grow: 3} */
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
    width: 230px;
    height: ${props => (props.isOpen ? '110px' : '0px')};
    transition: all 0.5s;
    /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, 0.2); */
    /* border-bottom: ${props => (props.isOpen ? `1px solid #e0e0e0` : 'none')}; */
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
  console.log(state.activeUser.themePath);
  return (
    <StyledDiv isOpen={state.profileConfigOpen} themePath={state.activeUser.themePath.themePath}>
      <div className="mainpanel">
        <div>
          <h1 className="header">Welcome to {state.activeUser.username}'s calculator!</h1>
        </div>
        <div>
          <Calculator />
        </div>
      </div>
      <div className="sidepanel">
        <div className="profile">
          <Profile username={state.activeUser.username} score={state.activeUser.score} />
        </div>
        <div className="profileConfig">
          <Login />
          <ThemePicker />
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
