import authenticatedClient from './authenticatedClient';

export default async function getScoreboardUsers() {
  const path = 'http://localhost:3002/users';
  const response = await authenticatedClient.get(path);
  return response;
}
