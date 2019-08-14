import * as express from 'express';
import db from '../Instances/db';
import argon2 from 'argon2';
// import passport from 'passport';
// import { Strategy } from 'passport-local';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const [user] = await db
    .select('*')
    .from('users')
    .where({ username });

  if (!user) return res.status(401).send('Login error');

  const verified = await argon2.verify(user.hashedPassword, password);

  if (!verified) return res.status(401).send('Login error');

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    issuer: 'calculator',
    expiresIn: '12h',
  });

  return res.json(token);
});

export default router;
