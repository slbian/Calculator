import axios from 'axios';

export default async function incrementScore(username, displayText) {
  const userWithNewScore = await axios.post(
    `http://localhost:3002/executions?username=${username}&`,
    {
      displayText
    }
  );
  return userWithNewScore;
}
