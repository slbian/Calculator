import React, { Component } from 'react';
import axios from 'axios';

function getUsers() {
  return axios
    .get('http://localhost:3002/all-users') // returns a promise
    .then(function(response) {
      // when this promise either resolves or reject (after finished, do this)
      // console.log(response.data);

      return response.data;
    })
    .catch(function(error) {
      console.log(error);
      return Promise.reject(error);
    });
}

// save response from GET in state? not allowed to access response outside of get???
export default class Scoreboard extends Component {
  state = {};

  componentDidMount() {
    getUsers().then(data => this.setState({ data }));
  }
  render() {
    return (
      <div className="scoreboard">
        Scoreboard
        {this.state.data
          ? this.state.data.map(userEntry => {
              return (
                <div key={userEntry.userName}>
                  {userEntry.userName} : {userEntry.score}{' '}
                </div>
              );
            })
          : 'Loading'}
      </div>
    );
  }
}
