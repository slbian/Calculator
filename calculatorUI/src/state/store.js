import React, { createContext, useReducer } from 'react';

const initialState = {
  activeUser: null,
  authChoice: 'login',
  displayText: '',
  isCleared: false,
  profileConfigOpen: false,
  themes: null,
  users: null,

  temperatureF: null,
  temperatureC: null,
  humidity    : null,
  windSpeedK  : null,
  windDeg     : null,
  timeZone    : null,
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
      return { ...state, displayText: '' };
    case 'logout':
      return initialState;
    case 'mountCalculator':
      return {
        ...state,
        activeUser: action.payload.activeUser,
        users: action.payload.users,
        themes: action.payload.themes
      };
    case 'mountWeather':
      console.log(action.payload.temp)
      return {
         ...state,
        //  weather: { TODO make a weather bucket
          temperatureF: (action.payload.temp * 9) / 5 - 459.67,
          temperatureC: action.payload.temp - 273.15,
          humidity    : action.payload.humidity,
          windSpeedK  : action.payload.wind_speed,
          windDeg     : action.payload.wind_deg,
          timeZone    : action.payload.timezone,
        //  } 
      };
    case 'setActiveUser':
      return { ...state, activeUser: action.payload };
    case 'setCleared':
      return { ...state, isCleared: true };
    case 'setDisplayText':
      return { ...state, displayText: action.payload };
    case 'setThemes':
      return { ...state, themes: action.payload };
    case 'setUsers':
      return { ...state, users: action.payload };
    case 'toggleAuth':
      return { ...state, authChoice: action.payload };
    case 'toggleProfileConfig':
      return { ...state, profileConfigOpen: !state.profileConfigOpen };
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
