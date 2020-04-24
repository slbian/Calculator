export const addCharacter = char => {
  return { type: 'addCharacter', payload: char };
};
export const clearScreen = () => {
  return { type: 'clearScreen' };
};
export const logout = () => {
  return { type: 'logout' };
};
export const mountCalculator = pageLoad => {
  return { type: 'mountCalculator', payload: pageLoad };
};
export const setActiveUser = newActiveUser => {
  return { type: 'setActiveUser', payload: newActiveUser };
};
export const setCleared = () => {
  return { type: 'setCleared' };
};
export const setDisplayText = evaluatedValue => {
  return { type: 'setDisplayText', payload: evaluatedValue };
};
export const setNotification = evaluatedValue => {
  return { type: 'setNotification', payload: evaluatedValue };
};
export const setThemes = allThemes => {
  return { type: 'setThemes', payload: allThemes };
};
export const setUsers = allUsers => {
  return { type: 'setUsers', payload: allUsers };
};
export const toggleAuth = authChoice => {
  return { type: 'toggleAuth', payload: authChoice };
};
export const toggleProfileConfig = () => {
  return { type: 'toggleProfileConfig' };
};
