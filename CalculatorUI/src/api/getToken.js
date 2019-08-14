import axios from 'axios';

export default async function getToken() {
  const response = await axios.get('http://localhost:3002/token');
  return response;
}
