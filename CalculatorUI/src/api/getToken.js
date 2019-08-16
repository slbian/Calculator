import axios from 'axios';

export default async function getToken(username, password) {
  try {
    const response = await axios.post(`http://localhost:3002/token`, {
      username,
      password
    });
    return response;
  } catch (error) {
    console.log(3, error);
  }
}
