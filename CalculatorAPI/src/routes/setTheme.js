import * as express from 'express';
import logger from '../Instances/logger';
import db from '../Instances/db';

const router = express.Router();

router.post('/', async (req, res) => {
  let [theme] = await db
    .select('*')
    .from('themes')
    .where('color', req.query.theme);

  // let newThemePath = theme.themePath;
  let [user] = await db('users')
    .where('id', req.query.userId)
    .update({
      themeId: theme.id,
    })
    .returning('*');
  // let updatedUser = { ...user, themePath: newThemePath };
  logger.trace('output setTheme: ', user);
  return res.json(user);
});

export default router;
