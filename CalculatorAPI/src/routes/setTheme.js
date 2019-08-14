import * as express from 'express';
import logger from '../Instances/logger';
import db from '../Instances/db';

const router = express.Router();

router.post('/', async (req, res) => {
  const [theme] = await db
    .select('*')
    .from('themes')
    .where('color', req.query.theme);

  if (req.actor.id !== Number(req.query.userId)) {
    console.log(req.actor.id);
    console.log(req.query.userId);
    res.status(401).send('UNAUTHORIZED');
  }

  const [user] = await db('users')
    .where('id', req.query.userId)
    .update({
      themeId: theme.id,
    })
    .returning('*');

  delete user.hashedPassword;

  const updatedUser = { ...user, theme };
  delete updatedUser.themeId;
  logger.trace('setTheme to: ', updatedUser.theme.color);
  return res.json(updatedUser);
});

export default router;
