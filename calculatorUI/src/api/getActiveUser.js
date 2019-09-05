import authenticatedClient from './authenticatedClient';

export default async function getActiveUser() {
  const path = 'http://localhost:3002/users/active';
  const response = await authenticatedClient.get(path);
  return response;
}
