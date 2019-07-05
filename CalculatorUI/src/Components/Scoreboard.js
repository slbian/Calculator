import React, { Component } from 'react';

// save response from GET in state? not allowed to access response outside of get???
export default class Scoreboard extends Component {
  render() {
    return (
      <div className="scoreboard">
        Scoreboard
        {this.props.users ? (
          this.props.users.map(userEntry => {
            return (
              <div key={userEntry.userName}>
                {userEntry.userName} : {userEntry.score}{' '}
              </div>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
