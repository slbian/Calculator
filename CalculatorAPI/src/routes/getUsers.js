import * as express from 'express';
import logger from '../Instances/logger';
import db from '../Instances/db';
import _ from 'lodash';

// app.get('/all-users', async (req, res) =>
const router = express.Router();

router.get('/', async (req, res) => {
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
    backgroundColor: 'pink',
  }));

  logger.trace('# users in db? ', users.length);
  return res.json(users);
  // setTimeout(() => res.json(users), 1000);
});

export default router;
