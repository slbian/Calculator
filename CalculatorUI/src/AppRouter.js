import React from 'react';
import './AppRouter.css';
import { Router, Switch, Route } from 'react-router-dom';
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
