import * as express from 'express';
import logger from '../Instances/logger';
import db from '../Instances/db';
import _ from 'lodash';
import usersController from '../Instances/usersController';

const router = express.Router();

router.get('/', async (req, res) => {
  let users = await db.select('*').from('users');

  users = users.map(user => {
    delete user.hashedPassword;
    return user;
  });

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
    };
    return populatedUser;
  });

  users = _.sortBy(users, 'score').reverse();
  logger.trace('# users in db? ', users.length);

  logger.trace('users:', users);
  return res.json(users);
  // setTimeout(() => res.json(users), 1000);
});

router.get('/active', usersController.getActiveUser);
// router.get('/active', async (req, res) => {
//   let user = req.actor;
//   const [theme] = await db
//     .select('*')
//     .from('themes')
//     .where('id', req.actor.themeId);

//   user.theme = theme;
//   delete user.themeId;
//   return res.json(user);
// });

export default router;
