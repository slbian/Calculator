import authenticatedClient from './authenticatedClient';

export default async function setTheme(userId, theme) {
  const path = `http://localhost:3002/themes?userId=${userId}&theme=${theme}`;
  const body = {};
  const response = await authenticatedClient.post(path, body);
  return response;
}
