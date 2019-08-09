import axios from 'axios';

export default async function incrementScore(username, displayText) {
  const userWithNewScore = await axios.post(
    `http://localhost:3002/increment-score?username=${username}&`,
    {
      displayText
    }
  );
  return userWithNewScore;
}
