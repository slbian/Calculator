import axios from 'axios';

export default async function setTheme(userId, theme) {
  const response = await axios.post(
    `http://localhost:3002/set-theme?userId=${userId}&theme=${theme}`
  );
  return response;
}
