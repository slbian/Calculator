import passport from 'passport';
import passportJWT from 'passport-jwt';

import db from '../Instances/db';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const JWT_SECRET = process.env.JWT_SECRET;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async function(jwtPayload, cb) {
      let [user] = await db
        .select('*')
        .from('users')
        .where({ id: jwtPayload.userId });

      delete user.hashedPassword;

      cb(null, user);
    }
  )
);

export default passport;
