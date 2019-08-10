import React, { createContext, useReducer } from 'react';

const initialState = {
  displayText: '',
  isCleared: false,
  activeUser: null,
  users: null,
  loginText: '',
  profileConfigOpen: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'addCharacter':
      if (state.displayText.length > 15) return state;
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
    case 'pickColor':
      return { ...state, activeUser: { ...state.activeUser, theme: action.payload } };
    case 'setActiveUser':
      return { ...state, activeUser: action.payload };
    case 'toggleProfileConfig':
      return { ...state, profileConfigOpen: !state.profileConfigOpen };
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
