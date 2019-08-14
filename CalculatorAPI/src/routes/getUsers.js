import * as express from 'express';
import logger from '../Instances/logger';
import db from '../Instances/db';
import _ from 'lodash';

// app.get('/all-users', async (req, res) =>
const router = express.Router();

router.get('/', async (req, res) => {
  console.log('************', req.actor);

  let users = await db.select('*').from('users');

  users = users.map(user => {
    delete user.hashedPassword;
    return user;
  });

  let themes = await db.select('*').from('themes');
  // .where('color', req.query.theme);

  themes = _.keyBy(themes, 'id');

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

  users = users.map(user => {
    const populatedUser = {
      ...user,
      score: Number(_.get(score, `[${user.id}].sum`, 0)),
      lastLogin: _.get(logins, `[${user.id}].created_at`, null),
      theme: _.get(themes, `[${user.themeId}]`, null),
    };
    delete populatedUser.themeId;
    return populatedUser;
  });

  users = _.sortBy(users, 'score').reverse();
  logger.trace('# users in db? ', users.length);

  logger.trace('users:', users);
  return res.json(users);
  // setTimeout(() => res.json(users), 1000);
});

export default router;
