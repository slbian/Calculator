import React from 'react';
// import React, { useContext } from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

// import { Store } from '../../state/store';

const SearchBar = styled.div`
  margin: 0 auto;
  max-width: 500px;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  background-color: #ffffff;
  font-size: 16px;
  padding: 10px 15px 10px 40px;
  color: #c5c5c5;
  transition: 0.2s;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:focus {
    color: #191919;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    outline: none;
  }
`;

const SearchIcon = styled.span`
  display: block;
  position: absolute;
  top: 50%;
  left: 22px;
  /* transform: translate(-50%, -50%); */
  height: 14px;
  width: 14px;
  font-size: 14px;
  color: #c5c5c5;
`;

export default function Search() {
  // const { state, dispatch } = useContext(Store);
  return (
    <SearchBar>
      <SearchInput placeholder="Enter city">
        <SearchIcon>
          <FiSearch/>
        </SearchIcon>
      </SearchInput>
    </SearchBar>
  );
}
