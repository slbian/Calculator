import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  width: 200px;
  background-color: #98cbec;
  color: black;
  padding: 15px;
  min-height: 30px;
`;

export default function Scoreboard({ users }) {
  return (
    <StyledDiv>
      Scoreboard
      {users ? (
        users.map(userEntry => {
          return (
            <div key={userEntry.username}>
              {userEntry.username} : {userEntry.score}{' '}
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </StyledDiv>
  );
}
