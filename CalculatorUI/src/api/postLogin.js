import axios from 'axios';

export default async function postLogin(username) {
  try {
    const userObject = await axios.post(`http://localhost:3002/logins?username=${username}`);
    return userObject;
  } catch (error) {
    console.log(2, error);
  }
}
