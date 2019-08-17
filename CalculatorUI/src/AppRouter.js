import React from 'react'; // useState, useReducer
import { Router, Switch, Route } from 'react-router-dom';

import './AppRouter.css';
import CalculatorApp from './pages/CalculatorApp';
import history from './state/history';
import LoginPage from './pages/LoginPage';

export default function AppRouter() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={CalculatorApp} />
      </Switch>
    </Router>
  );
}
