import React, { useEffect, useContext } from 'react'; // useState, useReducer
import styled from 'styled-components';

import './CalculatorApp.css';
import { mountCalculator } from '../state/actions';
import { Store } from '../state/store';
import Calculator from '../components/Calculator';
import getActiveUser from '../api/getActiveUser';
import getScoreboardUsers from '../api/getScoreboardUsers';
import getAllThemes from '../api/getAllThemes';
import history from '../state/history';
import Profile from '../components/Profile';
import Scoreboard from '../components/Scoreboard';
import ThemePicker from '../components/ThemePicker';

// NEXT TODO: rename based on best practices, do useSelector, alphabetize all imports, remove unecessary props
// TODO: add different emojis, change eval, live data, error handling/defensive programming, testing
// DONE: database, add useState hooks, refactor to useReducer, refactor to useContext, styled components, add styling to database, authentication w argon2

// error message in state
// style login page, make sure it has messages (invalid credentials) - or different error like network error (force by shutting down server)
// bring in that kind of error for the calculator, like if backend goes down while someone tries to evaluate
// logout button - just push to login page, and clear local storage
// add profile page
// cleanup all logs, make sure organized
const StyledDiv = styled.div`
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
    if (!state.activeUser || !state.users || !state.themes) {
      mount();
    }
  }, []); // [] means can only get called once

  if (!state.activeUser || !state.users || !state.themes) {
    return null;
  }

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
          <ThemePicker />
        </div>
        <div className="scoreboard">
          <Scoreboard users={state.users} />
        </div>
      </div>
    </StyledDiv>
  );

  async function mount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      const activeUserResponse = await getActiveUser();
      const allUsersResponse = await getScoreboardUsers();
      const allThemesResponse = await getAllThemes(); // return [ {id: 1, color: 'tomato}...

      if (activeUserResponse.data && allUsersResponse.data && allThemesResponse) {
        dispatch(
          mountCalculator({
            activeUser: activeUserResponse.data,
            users: allUsersResponse.data,
            themes: allThemesResponse.data
          })
        );
        // dispatch(setUsers(allUsersResponse.data));
        // console.log('this all users, ', state.users);
        // dispatch(setActiveUser(activeUserResponse.data));
        // console.log('this is the active user, ', state.activeUser);
        // dispatch(setThemes(allThemesResponse.data));
        // console.log('this is all themes, ', state.themes);
      } else {
        console.log('MOUNTING FAILED');
      }
    } else {
      console.log('MOUNT: no token');
      history.push('/login');
    }
  }
}
