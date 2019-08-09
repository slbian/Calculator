import axios from 'axios';

export default async function getAllUsers() {
  const response = await axios.get('http://localhost:3002/all-users');
  return response;
}
