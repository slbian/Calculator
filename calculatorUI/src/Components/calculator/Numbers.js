import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { addCharacter } from '../../state/actions';
import { Store } from '../../state/store';

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  overflow-wrap: normal;
  justify-content: center;
`;

export default function Numbers() {
  const { dispatch } = useContext(Store);

  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  function handleClick(text) {
    dispatch(addCharacter(text));
  }

  return (
    <StyledDiv>
      {values.map(val => (
        <Button text={val} handleClick={handleClick} key={val} />
      ))}
    </StyledDiv>
  );
}
