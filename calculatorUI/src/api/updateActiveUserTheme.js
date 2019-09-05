import authenticatedClient from './authenticatedClient';

export default async function updateActiveUserTheme(userId, themeId) {
  const path = `http://localhost:3002/users/updateActiveUserTheme?userId=${userId}&themeId=${themeId}`;
  const body = {};
  const response = await authenticatedClient.post(path, body);
  return response;
}
