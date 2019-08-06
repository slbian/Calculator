import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Calculator from './components/Calculator';
import Scoreboard from './components/Scoreboard';
import Profile from './components/Profile';
import Login from './components/Login';

//TODO: database, cleanup/layering, authorization, live data, error handling/defensive programming, styling, testing
export default class App extends Component {
  state = {
    displayText: '',
    isCleared: false,
    activeUser: { userName: 'sharonb', score: 1 },
    users: null,
    loginText: '',
  };

  render() {
    return (
      <div className="App">
        <head>
          <title>
            Welcome to ${this.state.activeUser.userName}'s calculator!
          </title>
        </head>
        <div className="mainpanel">
          <Calculator
            displayText={this.state.displayText}
            addCharacter={this.addCharacter.bind(this)}
            clearScreen={this.clearScreen.bind(this)}
            evaluate={this.evaluate.bind(this)}
          />
          <div className="login">
            <Login
              loginText={this.state.loginText}
              changeLogin={this.handleChangeLogin.bind(this)}
              requestLogin={this.handleLoginRequest.bind(this)}
            />
          </div>
        </div>
        <div className="sidepanel">
          <div className="profile">
            <Profile
              username={this.state.activeUser.username}
              score={this.state.activeUser.score}
            />
          </div>
          <div className="scoreboard">
            <Scoreboard users={this.state.users} />
          </div>
        </div>
      </div>
    );
  }
  // this = app
  addCharacter(char) {
    this.setState({
      displayText: this.state.isCleared
        ? `${char}`
        : `${this.state.displayText}${char}`,
      isCleared: false,
    });
  }

  clearScreen() {
    this.setState({ displayText: '' });
  }

  async evaluate() {
    try {
      if (this.state.isCleared) {
        return;
      }
      const userWithNewScore = await axios.post(
        `http://localhost:3002/increment-score?username=${
          this.state.activeUser.userName
        }&incrementamount=${this.state.displayText.length}`
      );

      const newActiveUser =
        userWithNewScore.data.userName === this.state.activeUser.userName
          ? {
              userName: this.state.activeUser.userName,
              score: userWithNewScore.data.newScore,
            }
          : this.state.activeUser;
      this.setState({
        displayText: eval(this.state.displayText),
        isCleared: true,
        activeUser: newActiveUser,
      });
      this.getUsers();
    } catch (error) {
      console.log('increment', error);
    }
  }

  async getUsers() {
    try {
      const response = await axios.get('http://localhost:3002/all-users');
      this.setState({ users: response.data });
      return response;
    } catch (error) {
      console.log(1, error);
    }
  }

  handleChangeLogin(event) {
    const text = event.target.value;
    this.setState({ loginText: text });
  }

  async postLogin(userName) {
    try {
      const userObject = await axios.post(
        `http://localhost:3002/login?username=${userName}`
      );
      return userObject;
    } catch (error) {
      console.log('login request', error);
    }
  }

  async handleLoginRequest() {
    const activeUser = await this.postLogin(this.state.loginText);
    this.setState({ activeUser: activeUser.data, loginText: '' });
  }

  async componentDidMount() {
    await this.getUsers();
    this.setState({ activeUser: this.state.users[0] });
  }
}
