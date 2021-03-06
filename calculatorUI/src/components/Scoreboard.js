import React, { useContext } from 'react';
import styled from 'styled-components';
import { Store } from '../state/store';

const StyledDiv = styled.div`
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  width: 200px;
  background-color: ${props => props.secondaryColor};
  color: white;
  padding: 15px;
  min-height: 30px;
  margin-top: 5px;

  h3 {
    margin: 0px 10px 15px 0px;
    text-transform: lowercase;
    font-weight: 300;
    font-size: 30px;
    letter-spacing: 3px;
    text-align: center;
  }

  ol {
    margin-top: 0px;
    padding: 0px;
  }

  ol li {
    list-style-type: none;
    text-transform: lowercase;
    font-weight: 200;
    letter-spacing: 3px;
    margin-bottom: 5px;
  }
`;

export default function Scoreboard({ users }) {
  const { state } = useContext(Store);
  return (
    <StyledDiv secondaryColor={state.activeUser.theme.secondaryColor}>
      <h3>Scoreboard</h3>
      <ol>
        {users ? (
          users.map(userEntry => 
              <li key={userEntry.username}>
                {userEntry.username} : {userEntry.score}
              </li>
          )
        ) : (
          <div>Loading...</div>
        )}
      </ol>
    </StyledDiv>
  );
}
