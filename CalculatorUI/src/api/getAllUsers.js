import axios from 'axios';

export default async function getAllUsers(config) {
  const response = await axios.get('http://localhost:3002/users', config);
  return response;
}
