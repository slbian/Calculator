import express from '../node_modules/express';
import cors from '../node_modules/cors/lib';
import '../node_modules/dotenv/config';
import Memory from './Memory';
import logger from './Instances/logger';
import db from './Instances/db';
import _ from 'lodash';

const PORT = process.env.PORT;
const app = express();

const memory = new Memory();
// middleware
app.use(cors());

// routes
app.get('/all-users', async (req, res) => {
  let users = await db.select('*').from('users');

  let score = await db
    .select('userId')
    .sum('score')
    .from('executions')
    .groupBy('userId');

  score = _.keyBy(score, 'userId');

  let logins = await db
    .select(db.raw('distinct on ("userId") "userId", "created_at"'))
    .from('logins');
  logins = _.keyBy(logins, 'userId');

  users = users.map(user => ({
    ...user,
    score: Number(_.get(score, `[${user.id}].sum`, 0)),
    lastLogin: _.get(logins, `[${user.id}].created_at`, null),
  }));

  logger.trace('count of users output: ', users.length);
  return res.json(users);
  // setTimeout(() => res.json(users), 1000);
});

// callback function - function that we put in another function
// TODO: add trigger for logins
app.post('/login', async (req, res) => {
  const username = req.query.username;
  logger.trace('login', username);

  const now = new Date().toISOString();

  let [user] = await db
    .select('*')
    .from('users')
    .where('username', username);

  if (!user) {
    [user] = await db('users')
      .insert({
        username: username,
      })
      .returning('*');
  }

  let scores = await db
    .select('userId')
    .sum('score')
    .from('executions')
    .groupBy('userId')
    .where('userId', user.id);

  let score = scores[0] ? Number(scores[0].sum) : 0;

  await db('logins').insert({
    userId: user.id,
    created_at: now,
    updated_at: now,
  });

  await db('logins').insert({
    userId: user.id,
    created_at: now,
    updated_at: now,
  });
  return res.json({ username: username, score });

  // before database - for memory

  // const username = req.query.username;
  // logger.trace('login', username);

  // const score = memory.getScoreByUsername(username);
  // if (score !== undefined) {
  //   res.json({ username, score });
  // } else {
  //   const user = memory.registerUser(username); // object
  //   res.json(user);
  // }
  // check if username typed in is in the cache:
  // if so, getScoreByUsername
  // if not, register
  // return {user, score}
});

app.post('/increment-score', async (req, res) => {
  logger.trace(
    'increment input',
    `${req.query.username} ${req.query.equation}`
  );
  const username = req.query.username;
  const equation = req.query.equation;

  let [user] = await db
    .select('*')
    .from('users')
    .where('username', username);

  await db('executions')
    .insert({
      equation: equation,
      score: eval(equation).toString().length,
      userId: user.id,
    })
    .returning('*');

  let [score] = await db
    .select('userId')
    .sum('score')
    .from('executions')
    .groupBy('userId')
    .where('userId', user.id);

  let newScore = score.sum;
  // const newScore = memory.incrementScoreForUser(username, equation);

  logger.trace('increment output', `${username} ${newScore}`);
  res.json({ username, newScore }); // need username and score
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
