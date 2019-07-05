import React, { Component } from 'react';
import axios from 'axios';

// when this promise either resolves or reject (after finished, do this)
// console.log(response.data);
async function getUsers() {
  try {
    const response = await axios.get('http://localhost:3002/all-users');
    return response.data;
  } catch (error) {
    console.log(1, error);
  }
}

// save response from GET in state? not allowed to access response outside of get???
export default class Scoreboard extends Component {
  state = {};

  async componentDidMount() {
    try {
      const data = await getUsers();
      this.setState({ data });
    } catch (error) {
      console.log(2, error);
    }
  }

  render() {
    return (
      <div className="scoreboard">
        Scoreboard
        {this.state.data ? (
          this.state.data.map(userEntry => {
            return (
              <div key={userEntry.userName}>
                {userEntry.userName} : {userEntry.score}{' '}
              </div>
            );
          })
        ) : (
          <div> 'Loading...' </div>
        )}
      </div>
    );
  }
}
