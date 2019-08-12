import * as express from 'express';
import logger from '../Instances/logger';
import db from '../Instances/db';

const router = express.Router();

router.post('/', async (req, res) => {
  const [theme] = await db
    .select('*')
    .from('themes')
    .where('color', req.query.theme);

  const [user] = await db('users')
    .where('id', req.query.userId)
    .update({
      themeId: theme.id,
    })
    .returning('*');

  const updatedUser = { ...user, theme };
  delete updatedUser.themeId;
  logger.trace('setTheme to: ', updatedUser.theme.color);
  return res.json(updatedUser);
});

export default router;
