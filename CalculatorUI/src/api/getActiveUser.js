import axios from 'axios';

export default async function getActiveUser(config) {
  const response = await axios.get('http://localhost:3002/users/active', config);
  return response;
}
