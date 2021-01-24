export const addCharacter = char => (
   { type: 'addCharacter', payload: char }
);
export const clearScreen = () => (
   { type: 'clearScreen' }
);
export const logout = () => (
   { type: 'logout' }
);
export const mountCalculator = pageLoad => (
   { type: 'mountCalculator', payload: pageLoad }
);
export const setWeather = weatherData => (
   { type: 'setWeather', payload: weatherData }
);
export const setActiveUser = newActiveUser => (
   { type: 'setActiveUser', payload: newActiveUser }
);
export const setCleared = () => (
   { type: 'setCleared' }
);
export const setDisplayText = evaluatedValue => (
   { type: 'setDisplayText', payload: evaluatedValue }
);
export const setThemes = allThemes => (
   { type: 'setThemes', payload: allThemes }
);
export const setUsers = allUsers => (
   { type: 'setUsers', payload: allUsers }
);
export const toggleAuth = authChoice => (
   { type: 'toggleAuth', payload: authChoice }
);
export const toggleProfileConfig = () => (
   { type: 'toggleProfileConfig' }
);
