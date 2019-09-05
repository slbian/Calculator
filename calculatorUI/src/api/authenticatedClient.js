import axios from 'axios';
import history from '../state/history';

class AuthenticatedClient {
  async get(path) {
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
    }
  }

  async post(path, body) {
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
    }
  }
}

export default new AuthenticatedClient();
