import express from '../node_modules/express';
import cors from '../node_modules/cors/lib';
import '../node_modules/dotenv/config';
import Memory from './Memory';
import logger from './Instances/logger';

const PORT = process.env.PORT;
const app = express();

const memory = new Memory();
// middleware
app.use(cors());

// routes
app.get('/all-users', (req, res) => {
  let users = [];
  // square brackets for left side when dont want string
  logger.trace('get users called');
  users = Object.entries(memory.cache).map(([key, value]) => ({
    userName: key,
    score: value,
  }));
  users = users.sort((a, b) => b.score - a.score); //descending
  users = users.slice(0, 5); // only show top 5
  logger.trace('get users output', users.length);
  setTimeout(() => res.json(users), 1000);
});

// callback function - function that we put in another function
app.post('/login', (req, res) => {
  const userName = req.query.username;
  logger.trace('login', userName);

  const score = memory.getScoreByUsername(userName);
  if (score !== undefined) {
    res.json({ userName, score });
  } else {
    const user = memory.registerUser(userName); // object
    res.json(user);
  }
  // check if username typed in is in the cache:
  // if so, getScoreByUsername
  // if not, register
  // return {user, score}
});

app.post('/increment-score', (req, res) => {
  logger.trace(
    'increment input',
    `${req.query.username} ${req.query.incrementamount}`
  );
  const userName = req.query.username;
  const incrementAmount = Number(req.query.incrementamount);

  const newScore = memory.incrementScoreForUser(userName, incrementAmount);

  logger.trace('increment output', `${userName} ${newScore}`);
  res.json({ userName, newScore }); // need username and score
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
