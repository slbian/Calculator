import authenticatedClient from './authenticatedClient';

export default async function getAllThemes() {
  const path = 'http://localhost:3002/themes';
  const response = await authenticatedClient.get(path);
  return response;
}
