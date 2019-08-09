import React, { createContext, useReducer } from 'react';

const initialState = {
  displayText: '',
  isCleared: false,
  activeUser: null,
  users: null,
  loginText: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'addCharacter':
      return {
        ...state,
        displayText: state.isCleared
          ? `${action.payload}`
          : `${state.displayText}${action.payload}`,
        isCleared: false
      };
    case 'clearScreen':
      return {
        ...state,
        displayText: ''
      };
    case 'setDisplayText':
      return { ...state, displayText: action.payload };
    case 'setCleared':
      return { ...state, isCleared: true };
    case 'setActiveUser':
      return { ...state, activeUser: action.payload };
    case 'setUsers':
      return { ...state, users: action.payload };
    case 'setLoginText':
      return { ...state, loginText: action.payload };
    default:
      throw new Error();
  }
};

export const Store = createContext(reducer);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{children}</Store.Provider>;
}
