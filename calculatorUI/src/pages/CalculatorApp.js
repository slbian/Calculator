import React, { useEffect, useContext } from 'react'; // useState, useReducer
import styled from 'styled-components';

import './CalculatorApp.css';
import { mountCalculator, setUsers } from '../state/actions';
import { Store } from '../state/store';
import Calculator from '../components/calculator/Calculator';
import getActiveUser from '../api/getActiveUser';
import getScoreboardUsers from '../api/getScoreboardUsers';
import getAllThemes from '../api/getAllThemes';
import history from '../state/history';
import Logout from '../components/Logout';
import Profile from '../components/Profile';
import Scoreboard from '../components/Scoreboard';
import ThemePicker from '../components/ThemePicker';

import socketIOClient from 'socket.io-client';

// TODO: memoization, add different emojis, change eval, live data, error handling/defensive programming, testing
// DONE: database, add useState hooks, refactor to useReducer, refactor to useContext, styled components, add styling to database, authentication w argon2, layered route/controller/service/data access object API,

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

  async function mount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      const activeUserResponse = await getActiveUser();
      const allUsersResponse = await getScoreboardUsers();
      const allThemesResponse = await getAllThemes(); // return [ {id: 1, color: 'tomato}...

      if (
        activeUserResponse &&
        allUsersResponse &&
        activeUserResponse.data &&
        allUsersResponse.data &&
        allThemesResponse
      ) {
        dispatch(
          mountCalculator({
            activeUser: activeUserResponse.data,
            users: allUsersResponse.data,
            themes: allThemesResponse.data
          })
        );

        // log the active user

      } else {
        console.log('MOUNTING FAILED');
      }
    } else {
      console.log('MOUNT: no token');
      history.push('/login');
    }
  }

  useEffect(() => {
    mount();
    const token = window.localStorage.getItem('token');
    const socket = socketIOClient('http://localhost:3002',{query: `auth_token=${token}`}); // looking at port 3003 (hacky way) // TODO: PORT environment variable
    
    console.log("use effect");

    socket.on('new-connection', data => {
      console.log('connection socket data = ', data)
    }); 

    socket.on('logout', data => {
      console.log('logout socket data = ', data)
    }); 

    socket.on('update-scoreboard', data => {
      // data is all the active users
      dispatch(setUsers(data.users)); 
    }); 

    return () => socket.disconnect();
  //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // [] means can only get called once 

  if (!state || !state.activeUser || !state.users || !state.themes) {
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
          <Logout />
        </div>
        <div className="scoreboard">
          <Scoreboard users={state.users} />
        </div>
      </div>
    </StyledDiv>
  );
}
