import React, { Component } from 'react';
import './App.css';

import Calculator from './components/Calculator';

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
  }
}
