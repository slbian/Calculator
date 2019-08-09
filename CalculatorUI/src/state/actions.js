export const addCharacter = char => {
  return { type: 'addCharacter', payload: char };
};
export const clearScreen = () => {
  return { type: 'clearScreen' };
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
export const setLoginText = loginText => {
  return { type: 'setLoginText', payload: loginText };
};
export const setUsers = allUsers => {
  return { type: 'setUsers', payload: allUsers };
};
