import axios from 'axios';
import history from '../state/history';

class AuthenticatedClient {
  get = async (path) => {
    try {
      const token = window.localStorage.getItem('token');
      const config = {
        headers: { Authorization: 'bearer '.concat(token) }
      };
      if (token) {
        const response = await axios.get(path, config);
        return response;
      }
      throw new Error();
    } catch (error) {
      // TODO: don't redirect for network errors
      history.push('/login');
      return null;
    }
  }

  post = async (path, body) => {
    try {
      const token = window.localStorage.getItem('token');
      const config = {
        headers: { Authorization: 'bearer '.concat(token) }
      };
      if (token) {
        const response = await axios.post(path, body, config);
        return response;
      }
      throw new Error();
    } catch (error) {
      // TODO: don't redirect for network errors
      history.push('/login');
      return null;
    }
  }
}

export default new AuthenticatedClient();
