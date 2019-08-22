export const addCharacter = char => {
  return { type: 'addCharacter', payload: char };
};
export const clearScreen = () => {
  return { type: 'clearScreen' };
};
export const pickColor = newBackgroundColor => {
  // TODO: rename to setTheme
  return { type: 'pickColor', payload: newBackgroundColor };
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
export const setErrorMessage = error => {
  return { type: 'setErrorMessage', payload: error };
};
export const setLoginTextPassword = passwordText => {
  return { type: 'setLoginTextPassword', payload: passwordText };
};
export const setLoginTextUsername = usernameText => {
  return { type: 'setLoginTextUsername', payload: usernameText };
};
export const setThemes = allThemes => {
  return { type: 'setThemes', payload: allThemes };
};
export const setUsers = allUsers => {
  return { type: 'setUsers', payload: allUsers };
};
export const toggleProfileConfig = () => {
  return { type: 'toggleProfileConfig' };
};
