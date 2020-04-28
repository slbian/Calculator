import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import './AppRouter.css';
import CalculatorApp from './pages/CalculatorApp';
import history from './state/history';
import AuthPage from './pages/AuthPage';
import WeatherPage from './pages/WeatherPage';

export default function AppRouter() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={AuthPage} />
        <Route path="/weather" component={WeatherPage} />
        <Route path="/" component={CalculatorApp} />
      </Switch>
    </Router>
  );
}
