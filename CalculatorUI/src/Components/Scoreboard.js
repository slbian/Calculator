import React, { Component } from 'react';

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
