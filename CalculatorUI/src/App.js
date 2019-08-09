import React, { useEffect, useContext } from 'react'; // useState, useReducer
import './App.css';

import Calculator from './components/Calculator';
import Scoreboard from './components/Scoreboard';
import Profile from './components/Profile';
import Login from './components/Login';
import { Store } from './state/store';
import { setActiveUser, setUsers } from './state/actions';
import getAllUsers from './api/getAllUsers';

// NEXT TODO: alphabetize all imports, remove unecessary props
// TODO: order the scoreboard, drop shadows, styled components w/ styling w database, use reducer hook, cleanup/layering, authorization, live data, error handling/defensive programming, testing
// DONE: database, add useState hooks, refactor to useReducer

// styled components: make clickable circles under profile
export default function App() {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    if (!state.users) {
      mount();
    }
  });

  if (!state.users || !state.activeUser) return <p> Loading calculator...</p>;

  return (
    <div className="App">
      <div className="header">Welcome to {state.activeUser.username}'s calculator!</div>
      <div className="mainpanel">
        <Calculator />
        <div className="login">
          <Login />
        </div>
      </div>
      <div className="sidepanel">
        <div className="profile">
          <Profile username={state.activeUser.username} score={state.activeUser.score} />
        </div>
        <div className="scoreboard">
          <Scoreboard users={state.users} />
        </div>
      </div>
    </div>
  );

  async function mount() {
    const response = await getAllUsers();
    dispatch(setUsers(response.data));
    dispatch(setActiveUser(response.data[0]));
  }
}
