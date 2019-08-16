import React from 'react'; // useState, useReducer
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './AppRouter.css';
import CalculatorApp from './pages/CalculatorApp';
import LoginPage from './pages/LoginPage';

// import green from ${state.activeUser};

// NEXT TODO: rename based on best practices, do useSelector, alphabetize all imports, remove unecessary props
// TODO: add different emojis, change eval,  cleanup/layering, authorization, live data, error handling/defensive programming, testing
// DONE: database, add useState hooks, refactor to useReducer, refactor to useContext, styled components, add styling to database

export default function AppRouter() {
  // const selectorState = useSelector(state2 => state2.activeUser);
  // console.log(state);

  return (
    <Router>
      <div>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={CalculatorApp} />
      </div>
    </Router>
  );
}
