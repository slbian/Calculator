import axios from 'axios';

export default async function postLogin(username, config) {
  try {
    const userObject = await axios.post(`http://localhost:3002/logins`, { username }, config);
    // ?username=${username}
    console.log('config:  ', config);
    return userObject;
  } catch (error) {
    console.log(2, error);
  }
}
