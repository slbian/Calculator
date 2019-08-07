import express from '../node_modules/express';
import cors from '../node_modules/cors/lib';
import bodyParser from 'body-parser';
import '../node_modules/dotenv/config';
import _ from 'lodash';

import getUsers from './routes/getUsers';
import postLogin from './routes/postLogin';
import evaluate from './routes/evaluate';
// import Memory from './Memory';

const PORT = process.env.PORT;
const app = express();

// const memory = new Memory();
// middleware
app.use(cors());
app.use(bodyParser.json());

//routes
app.use('/all-users', getUsers);
app.use('/login', postLogin);
app.use('/increment-score', evaluate);

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

export default app;
