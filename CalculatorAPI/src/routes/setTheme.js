import * as express from 'express';
import logger from '../Instances/logger';
import db from '../Instances/db';
import _ from 'lodash';

const router = express.Router();

router.post('/', async (req, res) => {
  logger.trace('input setTheme: ', req.query);
  let [user] = await db('users')
    .where('id', req.query.userId)
    .update({
      theme: req.query.theme,
    })
    .returning('*');
  logger.trace('input setTheme: ', user);
  return res.json(user);
});

export default router;
