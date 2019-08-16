import axios from 'axios';

export default async function setTheme(userId, theme, config) {
  const response = await axios.post(
    `http://localhost:3002/themes?userId=${userId}&theme=${theme}`,
    config
  );
  return response;
}
