import express from '../node_modules/express';
import cors from '../node_modules/cors/lib';
import bodyParser from 'body-parser';
import '../node_modules/dotenv/config';
import _ from 'lodash';
import morgan from 'morgan';
import getUsers from './routes/getUsers';
import postLogin from './routes/postLogin';
import evaluate from './routes/evaluate';
import setTheme from './routes/setTheme';
// import Memory from './Memory';

const PORT = process.env.PORT;
const app = express();

// const memory = new Memory();
// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

//routes
app.use('/users', getUsers);
app.use('/logins', postLogin);
app.use('/executions', evaluate);
app.use('/themes', setTheme);

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

export default app;
