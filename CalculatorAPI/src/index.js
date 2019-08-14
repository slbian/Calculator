import express from '../node_modules/express';
import cors from '../node_modules/cors/lib';
import bodyParser from 'body-parser';
import '../node_modules/dotenv/config';
import morgan from 'morgan';
import getUsers from './routes/getUsers';
import passport from './Passport/jwtStrategy';
import postLogin from './routes/postLogin';
import evaluate from './routes/evaluate';
import setTheme from './routes/setTheme';
import token from './routes/token';

// import Memory from './Memory';

const PORT = process.env.PORT;
const app = express();

// const memory = new Memory();
// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

//routes
app.use('/token', token);

// ^ public
app.use('/', passport.authenticate('jwt', { session: false }));
// everything below: private - protected route

// check for permissions
app.use('/', (req, res, next) => {
  req.actor = req.user;
  delete req.user;
  next();
});

// if you change secret, all tokens will be nuked
// store token in state for now (then refactor to local storage)

//passport route - must pass passport if u want to do any other route, make sure right person, signed w our secret
// check if user/pass is in right format, if there even is user/pass

app.use('/users', getUsers);
app.use('/logins', postLogin);
app.use('/executions', evaluate);
app.use('/themes', setTheme);

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

export default app;
