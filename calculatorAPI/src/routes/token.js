import { io } from "../index";

import * as express from 'express';
import argon2 from 'argon2';
import db from '../Instances/db';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const [user] = await db
    .select('*')
    .from('users')
    .where({ username });
    
    if (!user) return res.status(401).send('Login error');
  
    // hashed password - constant length
    const verified = await argon2.verify(user.hashedPassword, password);
  
    if (!verified) return res.status(401).send('Login error');
  
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      issuer: 'calculator',
      expiresIn: '12h',
    });

    io.sockets.emit('new-login', { user });

    return res.json(token);
  }
  catch (err) {
    console.log("/token error: ", {err})
    return res.status(500);
  }
});

export default router;
