import React, { useEffect, useContext } from 'react'; // useState, useReducer
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import './CalculatorApp.css';
import { setActiveUser, setUsers } from '../state/actions';
import { Store } from '../state/store';
import Calculator from '../components/Calculator';
import getAllUsers from '../api/getAllUsers';
import Login from '../components/Login';
import Profile from '../components/Profile';
import Scoreboard from '../components/Scoreboard';
import ThemePicker from '../components/ThemePicker';
// import green from ${state.activeUser};

// NEXT TODO: rename based on best practices, do useSelector, alphabetize all imports, remove unecessary props
// TODO: add different emojis, change eval,  cleanup/layering, authorization, live data, error handling/defensive programming, testing
// DONE: database, add useState hooks, refactor to useReducer, refactor to useContext, styled components, add styling to database

const StyledDiv = styled.div`
  /* background-color: ${props => props.theme}; */
  background-image: url(${props => props.themePath});
  background-size: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  .header {
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    color: ${props => props.secondaryColor};
    text-transform: lowercase;
    font-weight: 500;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 50px;
    text-shadow: 1px 1px 1px white;
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
    background-color: ${props => props.secondaryColor};
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
  }
`;

export default function CalculatorApp() {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    if (!state.users) {
      mount();
    }
  });
  // const selectorState = useSelector(state2 => state2.activeUser);
  // console.log(selectorState);

  if (!state.users || !state.activeUser) {
    console.log('trying to redirect');
    return <Redirect to="/login" />;
  }
  // console.log(state.activeUser);

  return (
    <StyledDiv
      isOpen={state.profileConfigOpen}
      themePath={state.activeUser.theme.themePath}
      secondaryColor={state.activeUser.theme.secondaryColor}
    >
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
    const response = await getAllUsers();
    dispatch(setUsers(response.data));
    dispatch(setActiveUser(response.data[0]));
  }

  // async function mount() {
  //   // first need to log in, get token
  //   // const newToken = await getToken('chuck', 'welcome');
  //   // put newToken in localstorage, then read from it
  //   // if (newToken) {
  //   // console.log('got new token: ', newToken.data);
  //   // dispatch(setToken(newToken.data));
  //   // need to put it in local storage - only client can read from window, then header
  //   // window.localStorage.setItem('token', newToken.data);
  //   const token = window.localStorage.getItem('token');
  //   if (token) {
  //     console.log('MOUNT: token - ', token);
  //     const config = {
  //       headers: { Authorization: 'bearer '.concat(token) }
  //     };
  //     // make an axios authenticationGET and POST wrapper - passes in config for you
  //     // then get all users
  //     const allUsers = await getAllUsers(config);

  //     if (allUsers) {
  //       dispatch(setUsers(allUsers.data));

  //       // set active user
  //       // dispatch(setActiveUser(allUsers.data[2]));
  //     } else {
  //       console.log('MOUNTING FAILED');
  //     }
  //   } else {
  //     console.log('MOUNT: no token');
  //   }
  // }
}
