import express from '../node_modules/express';
import cors from '../node_modules/cors/lib';
import '../node_modules/dotenv/config';
import Memory from './Memory';
import { type } from 'os';

const PORT = process.env.PORT;
const app = express();

const memory = new Memory();
// middleware
app.use(cors());

// routes
app.get('/all-users', (req, res) => {
  let users = [];
  // square brackets for left side when dont want string
  users = Object.entries(memory.cache).map(([key, value]) => ({
    userName: key,
    score: value,
  }));
  users = users.sort((a, b) => b.score - a.score); //descending
  res.json(users);
});

app.post('/register-user', (req, res) => {
  res.json(memory.registerUser(res)); // need username and score
});

app.post('/increment-score', (req, res) => {
  res.json(memory.incrementScoreForUser(res)); // need username and score
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
