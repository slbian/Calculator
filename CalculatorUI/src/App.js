import React, { Component } from 'react';
import './App.css';

import Calculator from './components/Calculator';
import Scoreboard from './components/Scoreboard';

export default class App extends Component {
  state = { displayText: '', isCleared: false };

  render() {
    return (
      <div className="App">
        <Calculator
          displayText={this.state.displayText}
          addCharacter={this.addCharacter.bind(this)}
          clearScreen={this.clearScreen.bind(this)}
          evaluate={this.evaluate.bind(this)}
        />
        <div className="scoreboard">
          <Scoreboard />
        </div>
      </div>
    );
  }
  // this = app
  addCharacter(char) {
    this.setState({
      displayText: this.state.isCleared
        ? char
        : `${this.state.displayText}${char}`,
      isCleared: false,
    });
  }

  clearScreen() {
    this.setState({ displayText: '' });
  }

  evaluate() {
    this.setState({
      displayText: eval(this.state.displayText),
      isCleared: true,
    });
    // axios
    //   .post('http://localhost:3002/register-user')
    //   .then(function(response) {
    //     console.log('post', response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
    // axios
    //   .post('http://localhost:3002/increment-score', [sharonb], 2)
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  }
}
