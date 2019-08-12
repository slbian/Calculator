import * as express from 'express';
import logger from '../Instances/logger';
import db from '../Instances/db';
import _ from 'lodash';

const router = express.Router();

router.post('/', async (req, res) => {
  logger.trace(
    'user and equation:',
    req.body
    // `${req.query.username} ${req.body.displayText}`
  );
  const username = req.query.username;
  const equation = req.body.displayText;

  let [user] = await db
    .select('*')
    .from('users')
    .where('username', username);

  console.log(eval(equation));

  await db('executions')
    .insert({
      equation: equation,
      score: Number(eval(equation).toString().length),
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

  let [theme] = await db
    .select('*')
    .from('themes')
    .where('id', user.themeId);

  logger.trace('user and new score:', `${username} ${newScore}`);

  res.json({ ...user, newScore, theme }); // need username and score
});

export default router;
