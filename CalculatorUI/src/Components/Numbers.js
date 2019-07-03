import React from 'react';
import '../App.css';
import Button from './Button';

// var React = require('react');
// var createReactClass = require('create-react-class');
// var ReactDOM = require('react-dom');

export default function Numbers(props) {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <div className="numbers">
      {/* <Button /> */}
      {values.map(val => (
        <Button text={val} handleClick={props.addCharacter} key={val} />
      ))}{' '}
      {/*write js in the curlies*/}
    </div>
  );
}

var ReactDOM = require('react-dom');

var green = '#39D1B4';
var yellow = '#FFD712';

module.exports = createReactClass({
  getInitialState: function() {
    return { color: green };
  },
  changeColor: function() {
    var newColor = this.state.color == green ? yellow : green;
    this.setState({ color: newColor });
  },

  render: function() {
    return (
      <div style={{ background: this.state.color }}>
        <h1>Change my color</h1>
        <button onClick={this.changeColor}>Change color</button>
      </div>
    );
  },
});
