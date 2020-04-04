import authenticatedClient from './authenticatedClient';

export default async function postExecution(displayText) {
  const path = `http://localhost:3002/executions`;
  const body = { displayText };
  const userWithNewScoreResponse = await authenticatedClient.post(path, body);
  return userWithNewScoreResponse;
}