import * as express from 'express';
import logger from '../Instances/logger';
import db from '../Instances/db';
import _ from 'lodash';

const router = express.Router();

// TODO: add trigger for logins
router.post('/', async (req, res) => {
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
  let [theme] = await db
    .select('themePath')
    .from('themes')
    .where('id', user.themeId);

  console.log('!!!!!!!!!!!!!!!!!!!!! theme', theme);

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

  return res.json({ ...user, score, themePath: theme });

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

export default router;
