import React, { useEffect, useReducer } from 'react'; // useState
import './App.css';
import axios from 'axios';

import Calculator from './components/Calculator';
import Scoreboard from './components/Scoreboard';
import Profile from './components/Profile';
import Login from './components/Login';

// TODO: styled components, use reducer hook, have a guest user that resets to 0 every time page is refreshed, cleanup/layering, authorization, live data, error handling/defensive programming, testing
// DONE: database, add useState hooks, refactor to useReducer

const initialState = {
  displayText: '',
  isCleared: false,
  activeUser: null,
  users: null,
  loginText: '',
  componentDidMount: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'mounted':
      return { ...state, componentDidMount: true };
    case 'addCharacter':
      return {
        ...state,
        displayText: state.isCleared
          ? `${action.payload}`
          : `${state.displayText}${action.payload}`,
        isCleared: false
      };
    case 'clearScreen':
      return {
        ...state,
        displayText: ''
        // isCleared: true
      };
    case 'setDisplayText':
      return { ...state, displayText: action.payload };
    case 'setCleared':
      return { ...state, isCleared: true };
    case 'setActiveUser':
      return { ...state, activeUser: action.payload };
    case 'setUsers':
      return { ...state, users: action.payload };
    case 'setLoginText':
      return { ...state, loginText: action.payload };
    default:
      throw new Error();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        <Calculator
          displayText={state.displayText}
          addCharacter={addCharacter}
          clearScreen={clearScreen}
          evaluate={evaluate}
        />
        <div className="login">
          <Login
            loginText={state.loginText}
            changeLogin={handleChangeLogin}
            requestLogin={handleLoginRequest}
          />
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

  function addCharacter(char) {
    dispatch({ type: 'addCharacter', payload: char });
  }

  function clearScreen() {
    dispatch({ type: 'clearScreen' });
  }

  async function evaluate() {
    try {
      const evaluatedValue = eval(state.displayText);
      if (state.isCleared || evaluatedValue === undefined) {
        return;
      }
      const userWithNewScore = await axios.post(
        `http://localhost:3002/increment-score?username=${state.activeUser.username}&`,
        { displayText: state.displayText }
      );

      const newActiveUser =
        userWithNewScore.data.username === state.activeUser.username
          ? {
              username: state.activeUser.username,
              score: Number(userWithNewScore.data.newScore)
            }
          : state.activeUser;

      dispatch({ type: 'setDisplayText', evaluatedValue });
      dispatch({ type: 'setCleared' });
      dispatch({ type: 'setActiveUser', payload: newActiveUser });

      await getUsers();
    } catch (error) {
      clearScreen();
    }
  }

  async function getUsers() {
    try {
      const response = await axios.get('http://localhost:3002/all-users');
      await dispatch({ type: 'setUsers', payload: response.data });
      return response.data;
    } catch (error) {
      console.log(1, error);
    }
  }

  // text in login box
  function handleChangeLogin(event) {
    const text = event.target.value;
    dispatch({ type: 'setLoginText', payload: text });
  }

  async function postLogin(username) {
    try {
      const userObject = await axios.post(`http://localhost:3002/login?username=${username}`);
      return userObject;
    } catch (error) {
      console.log(2, error);
    }
  }

  async function handleLoginRequest() {
    const activeUser = await postLogin(state.loginText);
    dispatch({ type: 'setActiveUser', payload: activeUser.data });
    dispatch({ type: 'setLoginText', payload: '' });
    clearScreen();
  }

  async function mount() {
    const usersList = await getUsers();
    dispatch({ type: 'setActiveUser', payload: usersList[0] });
    dispatch({ type: 'mounted' });
  }
}
